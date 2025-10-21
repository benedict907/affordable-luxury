import React, { useEffect, useRef } from "react";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle, ImageRun } from "docx";
import Row from "../components/Row";
import Column from "../components/Column";
import moment from "moment";
import BulletPoint from "../components/BulletPoint";
import {
  checkIfExists,
  generateCheckInDates,
  generateDateArray,
} from "../helper";
import { useLocation } from "react-router-dom";
import { EMPTY_BULLETS, IMAGE_PATH } from "../constants/constants";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { savePdf } from "../redux/createPdfSlice";
import { createBase64 } from "../redux/clientSlice";

function EnchantingKerala() {
  const location = useLocation();
  const {
    passengerList,
    selectedStartDate,
    selectedEndDate,
    selectedForm,
    flights,
    confirmationNumber,
  } = location.state || {};

  let currentDate = selectedStartDate;
  const { pdfs, base64Img } = useAppSelector((state) => state.client);
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.createPdf.rooms);

  const contentRef = useRef(null);
  const {
    imageName,
    main,
    groundItinerary,
    hotelItinerary,
    importantPoints,
    travelTips,
    transferFromMarariToAirport,
    // flights,
    transportation,
    emergencyContacts,
    customBulletPoint,
  } = selectedForm;

  const { emergencyNumberUK } = emergencyContacts || "";

  const updatedHotelItinerary = hotelItinerary.map((item) => ({
    ...item,
    rooms: rooms,
  }));

  const handleExportPDF = async () => {
    if (!contentRef.current) return;

    const content = contentRef.current;
    const originalOverflow = content.style.overflow;
    content.style.overflow = "visible";

    const canvas = await html2canvas(content, {
      scale: 2,
      scrollX: 0,
      scrollY: 0,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    // Get pixel dimensions
    const imgWidthPx = canvas.width;
    const imgHeightPx = canvas.height;

    // Set DPI to 96 (browser default), and convert to mm
    const pxToMm = (px) => px * 0.264583;

    const pdfWidthMm = pxToMm(imgWidthPx);
    const bufferPx = 50; // ~13mm buffer
    const imgHeightPxBuffered = canvas.height + bufferPx;

    const pdfHeightMm = pxToMm(imgHeightPxBuffered);

    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [pdfWidthMm, pdfHeightMm],
    });

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidthMm, pdfHeightMm);

    content.style.overflow = originalOverflow;

    pdf.save("exported.pdf");

    checkIfExists(pdfs, confirmationNumber, (exists) => {
      if (!exists) {
        onSavePressed();
      }
    });
  };

  const handleExportWord = async () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Header Section
          new Paragraph({
            children: [
              new TextRun({
                text: "Service Voucher",
                bold: true,
                size: 32,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: main.title,
                bold: true,
                size: 32,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // Confirmation Details
          new Paragraph({
            children: [
              new TextRun({
                text: `Confirmation number: ${confirmationNumber}`,
                bold: true,
              }),
            ],
            spacing: { after: 200 },
          }),

          // Date Range
          selectedStartDate && new Paragraph({
            children: [
              new TextRun({
                text: `${moment(selectedStartDate).format("DD MMMM YY")} - ${moment(selectedEndDate).format("DD MMMM YY")}`,
              }),
            ],
            spacing: { after: 200 },
          }),

          // Passenger Names
          new Paragraph({
            children: [
              new TextRun({
                text: "Passenger Names:",
                bold: true,
              }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: passengerList.join(", "),
              }),
            ],
            spacing: { after: 400 },
          }),

          // Hotel Details
          new Paragraph({
            children: [
              new TextRun({
                text: "Hotel Details",
                bold: true,
                size: 24,
              }),
            ],
            spacing: { before: 400, after: 200 },
          }),

          // Hotel Information
          ...updatedHotelItinerary?.map((hotel, index) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Hotel: ${hotel?.hotelName || ""}`,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Room Type: ${hotel?.roomType || ""}`,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Check-in: ${generateCheckInDates(currentDate, updatedHotelItinerary, index)}`,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Duration: ${hotel?.duration || ""} Nights`,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Rooms: ${hotel?.rooms || ""}`,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Meal Plan: ${hotel?.mealPlan || ""}`,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Status: ${hotel?.status || ""}`,
                }),
              ],
            }),
            new Paragraph({
              children: [new TextRun({ text: "" })],
              spacing: { after: 200 },
            }),
          ]).flat(),

          // Emergency Contact
          new Paragraph({
            children: [
              new TextRun({
                text: `Emergency Contact: ${main.emergencyContact || ""} - ${main.emergencyNumber || ""}`,
                bold: true,
              }),
            ],
            spacing: { before: 200, after: 400 },
          }),

          // Transportation Document
          new Paragraph({
            children: [
              new TextRun({
                text: "TRANSPORTATION DOCUMENT",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 200 },
          }),

          // Flight Details
          new Paragraph({
            children: [
              new TextRun({
                text: `Arrival ${flights?.arrivalCity || ""}`,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Flight No: ${flights?.arrivalFlightNumber || ""}`,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Date: ${moment(selectedStartDate).format("DD MMMM")}`,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Time: ${flights?.arrivalTime || ""}`,
              }),
            ],
          }),

          // Transfers
          new Paragraph({
            children: [
              new TextRun({
                text: "Transfers:",
                bold: true,
              }),
            ],
            spacing: { before: 200 },
          }),

          ...transportation.map((transport, index) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Service: ${transport?.service || ""}`,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Date: ${generateCheckInDates(currentDate, updatedHotelItinerary, index)}`,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Status: ${transport?.status || ""}`,
                }),
              ],
            }),
          ]).flat(),

          // Emergency Contact UK
          new Paragraph({
            children: [
              new TextRun({
                text: `Emergency Contact UK: ${emergencyNumberUK || ""}`,
              }),
            ],
            spacing: { before: 200 },
          }),

          // Departure Details
          new Paragraph({
            children: [
              new TextRun({
                text: `Departure ${flights?.departureCity || ""}`,
                bold: true,
              }),
            ],
            spacing: { before: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Flight no: ${flights?.departureFlightNumber || ""}`,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Date: ${moment(selectedEndDate).format("DD MMMM")}`,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Time: ${flights?.departureTime || ""}`,
              }),
            ],
          }),

          // Ground Itinerary
          new Paragraph({
            children: [
              new TextRun({
                text: "Ground Itinerary Summary",
                bold: true,
                size: 24,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 200 },
          }),

          // Ground Itinerary Details - Simplified approach
          ...generateDateArray(selectedStartDate, main.numberOfDays + 1)?.map(({ day, date }) => {
            return groundItinerary[day - 1]?.dailyTasks?.map((dayObj, index) => {
              const paragraphs = [];
              
              if (index === 0) {
                paragraphs.push(
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${date} - Day ${day}`,
                        bold: true,
                      }),
                    ],
                    spacing: { before: 200 },
                  })
                );
              }
              
              if (dayObj?.bulletPoints && dayObj.bulletPoints !== EMPTY_BULLETS) {
                paragraphs.push(
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${dayObj.time || ""} - ${dayObj.task || ""}`,
                        bold: true,
                      }),
                    ],
                  })
                );
                // Convert HTML bullet points to plain text
                const bulletText = dayObj.bulletPoints.replace(/<[^>]*>/g, '').replace(/\n/g, ' ').trim();
                if (bulletText) {
                  paragraphs.push(
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: bulletText,
                        }),
                      ],
                      indent: { left: 400 },
                    })
                  );
                }
              } else if (dayObj.task) {
                paragraphs.push(
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${dayObj.time || ""} - ${dayObj.task}`,
                      }),
                    ],
                  })
                );
                if (dayObj.description) {
                  paragraphs.push(
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: dayObj.description,
                        }),
                      ],
                      indent: { left: 400 },
                    })
                  );
                }
              }
              
              return paragraphs;
            }).flat() || [];
          }).flat() || [],

          // Important Points
          new Paragraph({
            children: [
              new TextRun({
                text: "Important Points",
                bold: true,
                size: 24,
              }),
            ],
            spacing: { before: 400, after: 200 },
          }),

          // Convert HTML important points to plain text
          importantPoints && importantPoints !== EMPTY_BULLETS && new Paragraph({
            children: [
              new TextRun({
                text: importantPoints.replace(/<[^>]*>/g, '').replace(/\n/g, ' ').trim(),
              }),
            ],
            indent: { left: 400 },
          }),

          // Travel Tips
          travelTips && travelTips !== EMPTY_BULLETS && new Paragraph({
            children: [
              new TextRun({
                text: "Few Travel Tips",
                bold: true,
                size: 24,
              }),
            ],
            spacing: { before: 400, after: 200 },
          }),

          travelTips && travelTips !== EMPTY_BULLETS && new Paragraph({
            children: [
              new TextRun({
                text: travelTips.replace(/<[^>]*>/g, '').replace(/\n/g, ' ').trim(),
              }),
            ],
            indent: { left: 400 },
          }),

          // Custom Bullet Point
          customBulletPoint.title && new Paragraph({
            children: [
              new TextRun({
                text: customBulletPoint.title,
                bold: true,
                size: 24,
              }),
            ],
            spacing: { before: 400, after: 200 },
          }),

          customBulletPoint.title && customBulletPoint.bulletPoints && new Paragraph({
            children: [
              new TextRun({
                text: customBulletPoint.bulletPoints.replace(/<[^>]*>/g, '').replace(/\n/g, ' ').trim(),
              }),
            ],
            indent: { left: 400 },
          }),

          // Transfer from Marari
          transferFromMarariToAirport && new Paragraph({
            children: [
              new TextRun({
                text: "Transfer from Marari Beach to Kochi Airport",
                bold: true,
                size: 24,
              }),
            ],
            spacing: { before: 400, after: 200 },
          }),

          transferFromMarariToAirport && travelTips && travelTips !== EMPTY_BULLETS && new Paragraph({
            children: [
              new TextRun({
                text: travelTips.replace(/<[^>]*>/g, '').replace(/\n/g, ' ').trim(),
              }),
            ],
            indent: { left: 400 },
          }),

          // Closing Message
          new Paragraph({
            children: [
              new TextRun({
                text: "Wishing you all happy and safe holiday!",
                bold: true,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 400 },
          }),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "service-voucher.docx";
    link.click();
    window.URL.revokeObjectURL(url);

    checkIfExists(pdfs, confirmationNumber, (exists) => {
      if (!exists) {
        onSavePressed();
      }
    });
  };

  const onSavePressed = async () => {
    const formData = new FormData();

    formData.append("main", JSON.stringify(main));
    formData.append(
      "confirmationDetails",
      JSON.stringify({
        confirmationNumber,
        passengerList,
        selectedStartDate,
        selectedEndDate,
      })
    );
    formData.append("flights", JSON.stringify(flights));
    formData.append("importantPoints", JSON.stringify(importantPoints));
    formData.append("travelTips", JSON.stringify(travelTips));
    formData.append("customBulletPoint", JSON.stringify(customBulletPoint));

    formData.append("image", imageName);

    // Append arrays: each element as separate entry
    updatedHotelItinerary.forEach((hotelItinerary, index) =>
      formData.append(`hotelItinerary`, JSON.stringify(hotelItinerary))
    );
    groundItinerary.forEach((groundItinerary, index) =>
      formData.append(`groundItinerary`, JSON.stringify(groundItinerary))
    );
    transportation.forEach((transportation, index) =>
      formData.append(`transportation`, JSON.stringify(transportation))
    );

    dispatch(savePdf(formData));
  };

  useEffect(() => {
    if (!imageName) return;
    dispatch(createBase64(imageName));
  }, [imageName]);

  return (
    <div>
      <div ref={contentRef} className="overflow-auto m-5">
        {/* Header Section */}
        {base64Img ? (
          <img className="m-10 w-44 h-44 cursor-pointer" src={base64Img} />
        ) : null}
        <div className="mb-6 text-center border border-gray-300 p-4">
          <h1 className="text-3xl font-bold underline">Service Voucher</h1>
          <h1 className="text-3xl font-bold underline">{main.title}</h1>
        </div>
        {/* Hotel Details */}
        <div className="mb-8">
          <Column>
            <Row>Confirmation number</Row>
            <Row>{confirmationNumber}</Row>
            <Row>&nbsp;</Row>
            {selectedStartDate ? (
              <Row>
                {moment(selectedStartDate).format("DD MMMM YY")} -{" "}
                {moment(selectedEndDate).format("DD MMMM YY")}
              </Row>
            ) : null}
          </Column>

          <Column>
            <Row>Passenger Names</Row>
            <Row>
              {passengerList.map((passenger, index) => (
                <span key={index}>
                  {passenger}
                  {index !== passengerList.length - 1 ? <br /> : ""}
                </span>
              ))}
            </Row>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
          </Column>

          <div className="flex flex-col border border-gray-300">
            {/* Header Row */}
            <Column>
              <Row>Hotel Name</Row>
              <Row>Room Type</Row>
              <Row>Check-in</Row>
              <Row>Duration</Row>
              <Row>Rooms</Row>
              <Row>Meal Plan</Row>
              <Row>Status</Row>
            </Column>
            {/* Data Rows */}
            {updatedHotelItinerary?.map((hotel, index) => (
              <Column>
                <Row>{hotel?.hotelName}</Row>
                <Row>{hotel?.roomType}</Row>
                <Row>
                  {generateCheckInDates(
                    currentDate,
                    updatedHotelItinerary,
                    index
                  )}
                </Row>
                <Row>{hotel?.duration} Nights</Row>
                <Row>{hotel?.rooms}</Row>
                <Row>{hotel?.mealPlan}</Row>
                <Row>{hotel?.status}</Row>
              </Column>
            ))}
            <Column>
              <Row>Emergency Contact</Row>
              <Row>{main.emergencyContact}</Row>
              <Row>&nbsp;</Row>
              <Row>&nbsp;</Row>
              <Row>&nbsp;</Row>
              <Row>&nbsp;</Row>
              <Row>&nbsp;</Row>
            </Column>
            <Column>
              <Row>Number</Row>
              <Row>{main.emergencyNumber}</Row>
              <Row>&nbsp;</Row>
              <Row>&nbsp;</Row>
              <Row>&nbsp;</Row>
              <Row>&nbsp;</Row>
              <Row>&nbsp;</Row>
            </Column>
          </div>
        </div>
        <div className="mb-8">
          <div className="text-center border border-gray-300 p-4">
            <h1 className="text-xl font-bold">TRANSPORTATION DOCUMENT</h1>
          </div>
          <Column>
            <Row>Arrival {flights?.arrivalCity}</Row>
            <Row>Flight No</Row>
            <Row>Date</Row>
            <Row>Time</Row>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
          </Column>
          <Column>
            <Row>&nbsp;</Row>
            <Row>{flights?.arrivalFlightNumber}</Row>
            <Row>{moment(selectedStartDate).format("DD MMMM")}</Row>
            <Row>{flights?.arrivalTime}</Row>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
          </Column>

          <Column>
            <Row>Transfers</Row>
            <Row>Service</Row>
            <Row>Date</Row>
            <Row>Status</Row>
          </Column>

          {transportation.map((transport, index) => (
            <Column>
              <Row>{transport?.transfers}</Row>
              <Row>{transport?.service}</Row>
              <Row>
                {generateCheckInDates(
                  currentDate,
                  updatedHotelItinerary,
                  index
                )}
              </Row>
              <Row>{transport?.status}</Row>
            </Column>
          ))}
          <Column>
            <Row style="text-start">{`Emergency Contact UK: ${
              emergencyNumberUK ? emergencyNumberUK : ""
            }`}</Row>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
          </Column>
          <Column>
            <Row style="text-start">
              ** Timings for Pickups and Drops, From and To the Airports will be
              according to the timings
            </Row>
            <Row>&nbsp;</Row>
          </Column>
          <Column>
            <Row style="text-start">Provided on the enclosed Air tickets.</Row>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
          </Column>
          <Column>
            <Row>&nbsp;</Row>
            <Row>Flight no.</Row>
            <Row>Date</Row>
            <Row>Time</Row>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
          </Column>
          <Column>
            <Row style="text-start">Departure {flights.departureCity}</Row>
            <Row>{flights.departureFlightNumber}</Row>
            <Row>{moment(selectedEndDate).format("DD MMMM")}</Row>
            <Row>{flights.departureTime}</Row>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
          </Column>
        </div>
        <div className="mb-8 border border-black-2">
          <div className="text-center border border-gray-300 p-4">
            <h1 className="text-xl font-bold">Ground Itinerary Summary</h1>
          </div>
          {generateDateArray(selectedStartDate, main.numberOfDays + 1)?.map(
            ({ day, date }) => {
              return groundItinerary[day - 1]?.dailyTasks?.map(
                (dayObj, index) => (
                  <Column key={index}>
                    <Row
                      style={"flex justify-center items-center"}
                      isDate={true}
                      showBorder={index === 0}
                    >
                      {index === 0 ? date : ""}
                    </Row>
                    <Row style={"flex justify-center items-center"}>
                      {index === 0 ? `Day ${day}` : dayObj.time}
                    </Row>
                    {dayObj?.bulletPoints !== EMPTY_BULLETS ? (
                      <BulletPoint
                        title={dayObj.task}
                        bulletPoints={dayObj.bulletPoints}
                      />
                    ) : dayObj.task ? (
                      <Row description={dayObj?.description} style="text-start">
                        {dayObj.task}
                      </Row>
                    ) : null}
                  </Column>
                )
              );
            }
          )}
        </div>
        <div className="mb-8">
          <h1 className="text-xl font-bold pb-3">Important Points</h1>
          <BulletPoint title={""} bulletPoints={importantPoints} />
        </div>
        {travelTips !== EMPTY_BULLETS ? (
          <div className="mb-8">
            <h1 className="text-xl font-bold pb-3">Few Travel Tips</h1>
            <BulletPoint title={""} bulletPoints={travelTips} />
          </div>
        ) : null}
        {customBulletPoint.title ? (
          <div className="mb-2">
            <h1 className="text-xl font-bold">{customBulletPoint.title}</h1>
            <BulletPoint
              title={""}
              bulletPoints={customBulletPoint.bulletPoints}
            />
          </div>
        ) : null}
        {transferFromMarariToAirport ? (
          <div className="mb-2">
            <h1 className="text-xl font-bold">
              Transfer from Marari Beach to Kochi Airport
            </h1>
            <BulletPoint title={""} bulletPoints={travelTips} />
          </div>
        ) : null}
        <div className="font-bold">Wishing you all happy and safe holiday!</div>
      </div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleExportPDF}
          className="bg-blue-500 text-white px-4 py-2 my-2 rounded active:opacity-50"
        >
          Export to PDF
        </button>
        <button
          onClick={handleExportWord}
          className="bg-green-500 text-white px-4 py-2 my-2 rounded active:opacity-50"
        >
          Export to Word
        </button>
      </div>
    </div>
  );
}

export default EnchantingKerala;
