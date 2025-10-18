import React, { useEffect, useRef, useState, useMemo } from "react";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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

  const updatedHotelItinerary = useMemo(() => 
    hotelItinerary.map((item) => ({
      ...item,
      rooms: rooms,
    })), [hotelItinerary, rooms]
  );
  // Local editable state for tables and dates
  const [localStartDate, setLocalStartDate] = useState(selectedStartDate);
  const [localEndDate, setLocalEndDate] = useState(selectedEndDate);
    let currentDate = localStartDate;
  const [hotelRows, setHotelRows] = useState(() => 
    hotelItinerary.map((item) => ({
      ...item,
      rooms: rooms,
    }))
  );
  const [transportRows, setTransportRows] = useState(transportation);
  const [editingCell, setEditingCell] = useState(null); // { section: 'hotel'|'transport', rowIndex: number, field: string }

  useEffect(() => {
    setHotelRows(updatedHotelItinerary);
  }, [updatedHotelItinerary]);

  useEffect(() => {
    setTransportRows(transportation);
  }, [transportation]);

  // Dropdown options
  const statusOptions = ["CONFIRMED", "PENDING", "CANCELLED"];
  const mealPlanOptions = ["EP", "CP", "MAP", "AP", "BB", "HB"];
  const numericOptions = Array.from({ length: 15 }, (_, i) => String(i + 1));

  const handleCellChange = (section, rowIndex, field, newValue) => {
    if (section === "hotel") {
      setHotelRows((prev) => {
        const next = [...prev];
        next[rowIndex] = { ...next[rowIndex], [field]: newValue };
        return next;
      });
    } else if (section === "transport") {
      setTransportRows((prev) => {
        const next = [...prev];
        next[rowIndex] = { ...next[rowIndex], [field]: newValue };
        return next;
      });
    }
    setEditingCell(null);
  };

  const renderEditable = ({ section, rowIndex, field, value, options }) => {
    const isEditing =
      editingCell &&
      editingCell.section === section &&
      editingCell.rowIndex === rowIndex &&
      editingCell.field === field;

    if (!options || options.length === 0) {
      options = [String(value || "-")];
    }

    return isEditing ? (
      <select
        className="w-full border border-gray-300 p-1"
        autoFocus
        value={String(value || "")}
        onChange={(e) => handleCellChange(section, rowIndex, field, e.target.value)}
        onBlur={() => setEditingCell(null)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ) : (
      <div
        className="cursor-pointer"
        onClick={() => setEditingCell({ section, rowIndex, field })}
      >
        {String(value || "-")}
      </div>
    );
  };

  const renderDateEditable = ({ section, rowIndex, field, value, fallbackValue }) => {
    const isEditing =
      editingCell &&
      editingCell.section === section &&
      editingCell.rowIndex === rowIndex &&
      editingCell.field === field;

    const displayValue = value ? moment(value).format("DD MMMM") : fallbackValue;

    return isEditing ? (
      <input
        type="date"
        className="w-full border border-gray-300 p-1"
        autoFocus
        value={value ? moment(value).format("YYYY-MM-DD") : ""}
        onChange={(e) => handleCellChange(section, rowIndex, field, e.target.value)}
        onBlur={() => setEditingCell(null)}
      />
    ) : (
      <div
        className="cursor-pointer"
        onClick={() => setEditingCell({ section, rowIndex, field })}
      >
        {displayValue}
      </div>
    );
  };

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

  const onSavePressed = async () => {
    const formData = new FormData();

    formData.append("main", JSON.stringify(main));
    formData.append(
      "confirmationDetails",
      JSON.stringify({
        confirmationNumber,
        passengerList,
        selectedStartDate: localStartDate,
        selectedEndDate: localEndDate,
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
            {localStartDate ? (
              <Row>
                {moment(localStartDate).format("DD MMMM YY")} -{" "}
                {moment(localEndDate).format("DD MMMM YY")}
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
            {hotelRows?.map((hotel, index) => (
              <Column key={`hotel-row-${index}`}>
                <Row>
                  {renderEditable({
                    section: "hotel",
                    rowIndex: index,
                    field: "hotelName",
                    value: hotel?.hotelName,
                    options: [hotel?.hotelName || "-"],
                  })}
                </Row>
                <Row>
                  {renderEditable({
                    section: "hotel",
                    rowIndex: index,
                    field: "roomType",
                    value: hotel?.roomType,
                    options: [hotel?.roomType || "Deluxe", "Standard", "Suite"],
                  })}
                </Row>
                <Row>
                  {renderDateEditable({
                    section: "hotel",
                    rowIndex: index,
                    field: "checkInDate",
                    value: hotel?.checkInDate,
                    fallbackValue: generateCheckInDates(currentDate, hotelRows, index)
                  })}
                </Row>
                <Row>
                  {renderEditable({
                    section: "hotel",
                    rowIndex: index,
                    field: "duration",
                    value: String(hotel?.duration || ""),
                    options: numericOptions,
                  })}
                  {" "}Nights
                </Row>
                <Row>
                  {renderEditable({
                    section: "hotel",
                    rowIndex: index,
                    field: "rooms",
                    value: String(hotel?.rooms || ""),
                    options: numericOptions,
                  })}
                </Row>
                <Row>
                  {renderEditable({
                    section: "hotel",
                    rowIndex: index,
                    field: "mealPlan",
                    value: hotel?.mealPlan,
                    options: mealPlanOptions,
                  })}
                </Row>
                <Row>
                  {renderEditable({
                    section: "hotel",
                    rowIndex: index,
                    field: "status",
                    value: hotel?.status,
                    options: statusOptions,
                  })}
                </Row>
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
            {/* Arrival Date Picker */}
            <Row
              style={{ cursor: "pointer" }}
              onClick={() => setEditingCell({ section: "flight-arrival", field: "date" })}
            >
              {editingCell &&
              editingCell.section === "flight-arrival" &&
              editingCell.field === "date" ? (
                <input
                  type="date"
                  className="border rounded px-2 py-1"
                  value={moment(localStartDate).format("YYYY-MM-DD")}
                  onChange={e => {
                    setLocalStartDate(e.target.value);
                    setEditingCell(null);
                  }}
                  onBlur={() => setEditingCell(null)}
                  autoFocus
                  style={{ minWidth: 120 }}
                />
              ) : (
                moment(localStartDate).format("DD MMMM")
              )}
            </Row>
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

          {transportRows.map((transport, index) => (
            <Column key={`transport-row-${index}`}>
              <Row>
                {renderEditable({
                  section: "transport",
                  rowIndex: index,
                  field: "transfers",
                  value: transport?.transfers,
                  options: [transport?.transfers || "-"],
                })}
              </Row>
              <Row>
                {renderEditable({
                  section: "transport",
                  rowIndex: index,
                  field: "service",
                  value: transport?.service,
                  options: [transport?.service || "-"],
                })}
              </Row>
              <Row>
                {renderDateEditable({
                  section: "transport",
                  rowIndex: index,
                  field: "date",
                  value: transport?.date,
                  fallbackValue: generateCheckInDates(currentDate, hotelRows, index)
                })}
              </Row>
              <Row>
                {renderEditable({
                  section: "transport",
                  rowIndex: index,
                  field: "status",
                  value: transport?.status,
                  options: statusOptions,
                })}
              </Row>
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
            {/* Departure Date Picker */}
            <Row
              style={{ cursor: "pointer" }}
              onClick={() => setEditingCell({ section: "flight-departure", field: "date" })}
            >
              {editingCell &&
              editingCell.section === "flight-departure" &&
              editingCell.field === "date" ? (
                <input
                  type="date"
                  className="border rounded px-2 py-1"
                  value={moment(localEndDate).format("YYYY-MM-DD")}
                  onChange={e => {
                    setLocalEndDate(e.target.value);
                    setEditingCell(null);
                  }}
                  onBlur={() => setEditingCell(null)}
                  autoFocus
                  style={{ minWidth: 120 }}
                />
              ) : (
                moment(localEndDate).format("DD MMMM")
              )}
            </Row>
            <Row>{flights.departureTime}</Row>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
          </Column>
        </div>
        <div className="mb-8 border border-black-2">
          <div className="text-center border border-gray-300 p-4">
            <h1 className="text-xl font-bold">Ground Itinerary Summary</h1>
          </div>
          {generateDateArray(localStartDate, main.numberOfDays + 1)?.map(
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
      <div className="flex">
        <button
          onClick={handleExportPDF}
          className="bg-blue-500 text-white px-4 py-2 mx-auto  my-2 rounded active:opacity-50"
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
}

export default EnchantingKerala;
