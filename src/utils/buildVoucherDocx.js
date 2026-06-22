// buildVoucherDocx.js
// Builds a fully editable Word (.docx) Service Voucher from the voucher data
// using native docx tables (NOT an image). Mirrors the layout rendered in
// src/pages/EnchantingKerala.js so the Word file matches the on-screen voucher
// while staying editable.
//
// IMPORTANT: tables use FIXED layout with explicit column widths in twips
// (DXA). Percentage-only widths make docx emit a broken 100-twip column grid,
// which Word renders as a squished sliver in the top-left corner.
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  TableLayoutType,
  WidthType,
  BorderStyle,
  AlignmentType,
  VerticalAlign,
  ImageRun,
  PageOrientation,
} from "docx";
import { saveAs } from "file-saver";
import moment from "moment";
import { generateCheckInDates, generateDateArray } from "../helper";
import { EMPTY_BULLETS } from "../constants/constants";

const BLACK = "000000";

// Letter portrait (12240 x 15840 twips) with slim margins so the tables span
// nearly the full page width, matching the PDF export.
const PAGE_WIDTH = 12240;
const PAGE_HEIGHT = 15840;
const MARGIN = 360; // 0.25"
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2; // 11520 twips

// ~0.75pt single border on every side (border size is in 1/8 pt units)
const CELL_BORDERS = {
  top: { style: BorderStyle.SINGLE, size: 6, color: BLACK },
  bottom: { style: BorderStyle.SINGLE, size: 6, color: BLACK },
  left: { style: BorderStyle.SINGLE, size: 6, color: BLACK },
  right: { style: BorderStyle.SINGLE, size: 6, color: BLACK },
};

// Equal column widths (twips) that sum to the full content width.
const equalCols = (n) => {
  const w = Math.floor(CONTENT_WIDTH / n);
  const cols = Array(n).fill(w);
  cols[n - 1] = CONTENT_WIDTH - w * (n - 1); // absorb rounding remainder
  return cols;
};

// docx font size is in half-points (20 = 10pt)
const para = (text, { bold = false, align, size = 20 } = {}) =>
  new Paragraph({
    alignment: align,
    children: [new TextRun({ text: text == null ? "" : String(text), bold, size })],
  });

// width is in twips (DXA). content can be a string or an array of Paragraphs.
const cell = (content, { width, bold, align, verticalAlign } = {}) => {
  const children = Array.isArray(content)
    ? content
    : [para(content, { bold, align })];
  return new TableCell({
    width: width ? { size: width, type: WidthType.DXA } : undefined,
    borders: CELL_BORDERS,
    margins: { top: 40, bottom: 40, left: 60, right: 60 },
    verticalAlign: verticalAlign || VerticalAlign.TOP,
    children,
  });
};

// Fixed-layout table with an explicit column grid (twips) so Word renders it
// at full width with visible borders.
const table = (rows, columnWidths) =>
  new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths,
    layout: TableLayoutType.FIXED,
    rows,
  });

const spacer = () => new Paragraph({ spacing: { after: 120 }, children: [] });

// Parse a RichTextEditor HTML string (e.g. "<ul><li>x</li></ul>") into real
// Word bullet paragraphs. Falls back to a plain paragraph for non-list HTML.
const htmlToBulletParagraphs = (html) => {
  if (!html || html === EMPTY_BULLETS) return [];
  const parsed = new DOMParser().parseFromString(html, "text/html");
  const items = Array.from(parsed.querySelectorAll("li"));
  const paragraphs = [];
  items.forEach((li) => {
    const text = (li.textContent || "").replace(/ /g, " ").trim();
    if (text) paragraphs.push(new Paragraph({ text, bullet: { level: 0 } }));
  });
  if (paragraphs.length === 0) {
    const text = (parsed.body.textContent || "").replace(/ /g, " ").trim();
    if (text) paragraphs.push(para(text));
  }
  return paragraphs;
};

// A heading followed by a single bordered cell containing bullet points,
// matching the bordered BulletPoint Row on screen. Returns [] when empty.
const bulletSection = (title, html) => {
  const bullets = htmlToBulletParagraphs(html);
  if (bullets.length === 0) return [];
  const blocks = [];
  if (title) blocks.push(para(title, { bold: true, size: 28 }));
  blocks.push(table([new TableRow({ children: [cell(bullets, { width: CONTENT_WIDTH })] })], [CONTENT_WIDTH]));
  blocks.push(spacer());
  return blocks;
};

// Decode a data-URL / base64 logo into bytes + image type for ImageRun.
const decodeLogo = (base64Img) => {
  if (!base64Img) return null;
  let type = "png";
  let base64 = base64Img;
  const match = /^data:image\/(png|jpeg|jpg|gif);base64,(.*)$/i.exec(base64Img);
  if (match) {
    type = match[1].toLowerCase() === "jpg" ? "jpeg" : match[1].toLowerCase();
    base64 = match[2];
  }
  try {
    const data = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    return { data, type: type === "jpeg" ? "jpg" : type };
  } catch (err) {
    console.warn("Logo decode failed, skipping logo:", err);
    return null;
  }
};

export const buildVoucherDocx = (data) => {
  const {
    base64Img,
    main = {},
    confirmationNumber,
    passengerList = [],
    selectedStartDate,
    selectedEndDate,
    flights = {},
    hotelItinerary = [],
    transportation = [],
    groundItinerary = [],
    importantPoints,
    travelTips,
    customBulletPoint = {},
    transferFromMarariToAirport,
    emergencyContacts = {},
  } = data;

  const currentDate = selectedStartDate;
  const emergencyNumberUK = emergencyContacts?.emergencyNumberUK || "";
  const children = [];

  // ---- Header: logo + title ----
  const logo = decodeLogo(base64Img);
  if (logo) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
          new ImageRun({
            type: logo.type,
            data: logo.data,
            transformation: { width: 120, height: 120 },
          }),
        ],
      })
    );
  }
  children.push(
    table(
      [
        new TableRow({
          children: [
            cell(
              [
                para("Service Voucher", { bold: true, align: AlignmentType.CENTER, size: 32 }),
                para(main.title, { bold: true, align: AlignmentType.CENTER, size: 32 }),
              ],
              { width: CONTENT_WIDTH }
            ),
          ],
        }),
      ],
      [CONTENT_WIDTH]
    )
  );
  children.push(spacer());

  // ---- Confirmation / passengers (2 rows x 4 cols) ----
  const cols4 = equalCols(4);
  const dateRange = selectedStartDate
    ? `${moment(selectedStartDate).format("DD MMMM YY")} - ${moment(
        selectedEndDate
      ).format("DD MMMM YY")}`
    : "";
  const passengersCell = cell(
    [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: passengerList.map(
          (name, i) => new TextRun({ text: String(name), break: i > 0 ? 1 : 0, size: 20 })
        ),
      }),
    ],
    { width: cols4[1] }
  );
  children.push(
    table(
      [
        new TableRow({
          children: [
            cell("Confirmation number", { width: cols4[0], bold: true, align: AlignmentType.CENTER }),
            cell(confirmationNumber, { width: cols4[1], align: AlignmentType.CENTER }),
            cell("", { width: cols4[2] }),
            cell(dateRange, { width: cols4[3], align: AlignmentType.CENTER }),
          ],
        }),
        new TableRow({
          children: [
            cell("Passenger Names", { width: cols4[0], bold: true, align: AlignmentType.CENTER }),
            passengersCell,
            cell("", { width: cols4[2] }),
            cell("", { width: cols4[3] }),
          ],
        }),
      ],
      cols4
    )
  );
  children.push(spacer());

  // ---- Hotel grid (7 cols) ----
  const hotelHeaders = [
    "Hotel Name",
    "Room Type",
    "Check-in",
    "Duration",
    "Rooms",
    "Meal Plan",
    "Status",
  ];
  const cols7 = equalCols(7);
  const hotelRows = [
    new TableRow({
      tableHeader: true,
      children: hotelHeaders.map((h, i) =>
        cell(h, { width: cols7[i], bold: true, align: AlignmentType.CENTER })
      ),
    }),
  ];
  hotelItinerary.forEach((hotel, index) => {
    const values = [
      hotel?.hotelName,
      hotel?.roomType,
      generateCheckInDates(currentDate, hotelItinerary, index),
      hotel?.duration != null ? `${hotel.duration} Nights` : "",
      hotel?.rooms,
      hotel?.mealPlan,
      hotel?.status,
    ];
    hotelRows.push(
      new TableRow({
        children: values.map((v, i) =>
          cell(v, { width: cols7[i], align: AlignmentType.CENTER })
        ),
      })
    );
  });
  const sevenColRow = (label, value) =>
    new TableRow({
      children: [
        cell(label, { width: cols7[0], bold: true, align: AlignmentType.CENTER }),
        cell(value, { width: cols7[1], align: AlignmentType.CENTER }),
        ...cols7.slice(2).map((w) => cell("", { width: w })),
      ],
    });
  hotelRows.push(sevenColRow("Emergency Contact", main.emergencyContact));
  hotelRows.push(sevenColRow("Number", main.emergencyNumber));
  children.push(table(hotelRows, cols7));
  children.push(spacer());

  // ---- Transportation ----
  children.push(
    table(
      [
        new TableRow({
          children: [
            cell("TRANSPORTATION DOCUMENT", {
              width: CONTENT_WIDTH,
              bold: true,
              align: AlignmentType.CENTER,
            }),
          ],
        }),
      ],
      [CONTENT_WIDTH]
    )
  );
  const cols6 = equalCols(6);
  const sixColRow = (vals) =>
    new TableRow({
      children: vals.map((v, i) => cell(v, { width: cols6[i], align: AlignmentType.CENTER })),
    });
  children.push(
    table(
      [
        sixColRow([`Arrival ${flights?.arrivalCity || ""}`, "Flight No", "Date", "Time", "", ""]),
        sixColRow([
          "",
          flights?.arrivalFlightNumber,
          selectedStartDate ? moment(selectedStartDate).format("DD MMMM") : "",
          flights?.arrivalTime,
          "",
          "",
        ]),
      ],
      cols6
    )
  );
  children.push(spacer());

  // Transfers table (4 cols)
  const transferRows = [
    new TableRow({
      tableHeader: true,
      children: ["Transfers", "Service", "Date", "Status"].map((h, i) =>
        cell(h, { width: cols4[i], bold: true, align: AlignmentType.CENTER })
      ),
    }),
  ];
  transportation.forEach((transport, index) => {
    const values = [
      transport?.transfers,
      transport?.service,
      generateCheckInDates(currentDate, hotelItinerary, index),
      transport?.status,
    ];
    transferRows.push(
      new TableRow({
        children: values.map((v, i) =>
          cell(v, { width: cols4[i], align: AlignmentType.CENTER })
        ),
      })
    );
  });
  transferRows.push(
    new TableRow({
      children: [
        cell(`Emergency Contact UK: ${emergencyNumberUK}`, { width: cols4[0] }),
        cell("", { width: cols4[1] }),
        cell("", { width: cols4[2] }),
        cell("", { width: cols4[3] }),
      ],
    })
  );
  children.push(table(transferRows, cols4));
  children.push(spacer());

  // Notes
  children.push(
    para(
      "** Timings for Pickups and Drops, From and To the Airports will be according to the timings provided on the enclosed Air tickets."
    )
  );
  children.push(spacer());

  // Departure flight (6 cols)
  children.push(
    table(
      [
        sixColRow(["", "Flight no.", "Date", "Time", "", ""]),
        sixColRow([
          `Departure ${flights?.departureCity || ""}`,
          flights?.departureFlightNumber,
          selectedEndDate ? moment(selectedEndDate).format("DD MMMM") : "",
          flights?.departureTime,
          "",
          "",
        ]),
      ],
      cols6
    )
  );
  children.push(spacer());

  // ---- Ground Itinerary (3 cols: date | day/time | task) ----
  children.push(
    table(
      [
        new TableRow({
          children: [
            cell("Ground Itinerary Summary", {
              width: CONTENT_WIDTH,
              bold: true,
              align: AlignmentType.CENTER,
            }),
          ],
        }),
      ],
      [CONTENT_WIDTH]
    )
  );
  // 15% / 15% / 70% of the content width
  const groundCols = [
    Math.round(CONTENT_WIDTH * 0.15),
    Math.round(CONTENT_WIDTH * 0.15),
    CONTENT_WIDTH - Math.round(CONTENT_WIDTH * 0.15) * 2,
  ];
  const groundRows = [];
  generateDateArray(selectedStartDate, (main.numberOfDays || 0) + 1)?.forEach(
    ({ day, date }) => {
      groundItinerary[day - 1]?.dailyTasks?.forEach((dayObj, index) => {
        let taskCellContent;
        if (dayObj?.bulletPoints && dayObj.bulletPoints !== EMPTY_BULLETS) {
          const blocks = [];
          if (dayObj.task) blocks.push(para(dayObj.task, { bold: true }));
          blocks.push(...htmlToBulletParagraphs(dayObj.bulletPoints));
          taskCellContent = blocks.length ? blocks : "";
        } else if (dayObj?.task) {
          const blocks = [para(dayObj.task)];
          if (dayObj.description) blocks.push(para(dayObj.description, { bold: true }));
          taskCellContent = blocks;
        } else {
          taskCellContent = "";
        }
        groundRows.push(
          new TableRow({
            children: [
              cell(index === 0 ? date : "", { width: groundCols[0], align: AlignmentType.CENTER }),
              cell(index === 0 ? `Day ${day}` : dayObj?.time, {
                width: groundCols[1],
                align: AlignmentType.CENTER,
              }),
              cell(taskCellContent, { width: groundCols[2] }),
            ],
          })
        );
      });
    }
  );
  if (groundRows.length) {
    children.push(table(groundRows, groundCols));
  }
  children.push(spacer());

  // ---- Bullet sections ----
  children.push(...bulletSection("Important Points", importantPoints));
  children.push(...bulletSection("Few Travel Tips", travelTips));
  if (customBulletPoint?.title) {
    children.push(...bulletSection(customBulletPoint.title, customBulletPoint.bulletPoints));
  }
  if (transferFromMarariToAirport) {
    children.push(
      ...bulletSection("Transfer from Marari Beach to Kochi Airport", travelTips)
    );
  }

  // ---- Footer ----
  children.push(para("Wishing you all happy and safe holiday!", { bold: true }));

  return new Document({
    styles: {
      default: { document: { run: { font: "Arial", size: 20 } } },
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              width: PAGE_WIDTH,
              height: PAGE_HEIGHT,
              orientation: PageOrientation.PORTRAIT,
            },
            margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
          },
        },
        children,
      },
    ],
  });
};

// Build the document and trigger a browser download.
export const downloadVoucherDocx = async (data, filename = "voucher.docx") => {
  const doc = buildVoucherDocx(data);
  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
};

export default downloadVoucherDocx;
