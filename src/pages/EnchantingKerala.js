import React, { useRef } from "react";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Row from "../components/Row";
import Column from "../components/Column";
import moment from "moment";
import BulletPoint from "../components/BulletPoint";
import {
  generateCheckInDates,
  generateDateArray,
  getConstantData,
  getEmergencyContacts,
} from "../helper";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import ImageUploader from "../components/ImageUploader";

function EnchantingKerala() {
  const location = useLocation();
  const {
    passengerList,
    selectedStartDate,
    selectedEndDate,
    selectedForm,
    confirmationNumber,
  } = location.state || {};
  console.log("selectedForm", selectedForm);
  let currentDate = selectedStartDate;
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const contentRef = useRef(null);

  // const handleExportPDF = async () => {
  //   if (!contentRef.current) return;

  //   const content = contentRef.current;
  //   const canvas = await html2canvas(content, {
  //     scale: 2, // Higher resolution
  //     scrollX: 0,
  //     scrollY: 0,
  //     useCORS: true, // Ensures cross-origin images are captured
  //   });

  //   const imgData = canvas.toDataURL("image/png");
  //   const pdf = new jsPDF("p", "mm", "a4");

  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = pdf.internal.pageSize.getHeight();

  //   const imgWidth = canvas.width;
  //   const imgHeight = canvas.height;

  //   const ratio = imgWidth / imgHeight;

  //   let width = pdfWidth;
  //   let height = pdfWidth / ratio;

  //   // Adjust to fit within PDF dimensions
  //   if (height > pdfHeight) {
  //     height = pdfHeight;
  //     width = pdfHeight * ratio;
  //   }

  //   pdf.addImage(imgData, "PNG", (pdfWidth - width) / 2, 0, width, height);

  //   pdf.save("exported.pdf");
  // };

  const {
    groundItinerary,
    hotelItinerary,
    transportationDocument,
    importantPoints,
    travelTips,
    transferFromMarariToAirport,
  } = selectedForm.data;

  const handleExportPDF = async () => {
    if (!contentRef.current) return;

    const pdf = new jsPDF("p", "mm", "a4");
    const content = contentRef.current;

    // Temporarily remove scrollbars to capture full content
    const originalOverflow = content.style.overflow;
    content.style.overflow = "visible";

    const canvas = await html2canvas(content, {
      scale: 2,
      scrollX: 0,
      scrollY: 0,
      useCORS: true, // Ensures cross-origin images are captured
    });

    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const pageHeightInPx = (pdfHeight * imgWidth) / pdfWidth; // Calculate equivalent height in pixels
    let yOffset = 0;

    while (yOffset < imgHeight) {
      const canvasHeight = Math.min(imgHeight - yOffset, pageHeightInPx);
      const canvasSection = canvas
        .getContext("2d")
        .getImageData(0, yOffset, imgWidth, canvasHeight);

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = imgWidth;
      tempCanvas.height = canvasHeight;
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx.putImageData(canvasSection, 0, 0);

      const imgSection = tempCanvas.toDataURL("image/png");

      pdf.addImage(
        imgSection,
        "PNG",
        0,
        0,
        pdfWidth,
        (canvasHeight * pdfWidth) / imgWidth
      );

      yOffset += pageHeightInPx;
      if (yOffset < imgHeight) pdf.addPage();
    }

    // Restore scrollbars
    content.style.overflow = originalOverflow;

    pdf.save("exported.pdf");
  };
  return (
    <div>
      <div ref={contentRef} className="overflow-auto m-5">
        {/* Header Section */}

        <ImageUploader />

        <div className="mb-6 text-center border border-gray-300 p-4">
          <h1 className="text-3xl font-bold underline">Service Voucher</h1>
          <h1 className="text-3xl font-bold underline">{selectedForm.title}</h1>
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
            {hotelItinerary.map((hotel, index) => (
              <Column>
                <Row>{hotel.name}</Row>
                <Row>{hotel.roomType}</Row>
                <Row>
                  {generateCheckInDates(currentDate, hotelItinerary, index)}
                </Row>
                <Row>{hotel?.durationNights} Nights</Row>
                <Row>1</Row>
                <Row>
                  {hotel?.mealPlan ? hotel.mealPlan : "Breakfast & Dinner"}
                </Row>
                <Row>Confirmed</Row>
              </Column>
            ))}
            <Column>
              <Row>Emergency Contact</Row>
              <Row>Mr Pratheesh Thomas</Row>
              <Row>&nbsp;</Row>
              <Row>&nbsp;</Row>
              <Row>&nbsp;</Row>
              <Row>&nbsp;</Row>
              <Row>&nbsp;</Row>
            </Column>
            <Column>
              <Row>Number</Row>
              <Row>WhatsApp+91-9645379919, +91-99625 79919 +91 90617 68888</Row>
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
            <Row>Arrival Kochi</Row>
            <Row>Flight No</Row>
            <Row>Date</Row>
            <Row>Time</Row>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
          </Column>
          <Column>
            <Row>&nbsp;</Row>
            <Row>AI 2517</Row>
            <Row>{moment(selectedStartDate).format("DD MMMM")}</Row>
            <Row>15:10</Row>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
          </Column>

          <Column>
            <Row>Transfers</Row>
            <Row>Service</Row>
            <Row>Date</Row>
            <Row>Status</Row>
          </Column>

          {transportationDocument.map((transport, index) => (
            <Column>
              <Row>{transport.transfer}</Row>
              <Row>Private Car - English Speaking Driver</Row>
              <Row>
                {generateCheckInDates(currentDate, hotelItinerary, index)}
              </Row>
              <Row>OK</Row>
            </Column>
          ))}
          <Column>
            <Row style="text-start">
              {getEmergencyContacts(selectedForm.title)}
            </Row>
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
            <Row style="text-start">Departure Kochi</Row>
            <Row>EY 331</Row>
            <Row>12 Mar</Row>
            <Row>09:55</Row>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
          </Column>
        </div>
        <div className="mb-8 border border-black-2">
          <div className="text-center border border-gray-300 p-4">
            <h1 className="text-xl font-bold">Ground Itinerary Summary</h1>
          </div>
          {generateDateArray(selectedStartDate, 16)?.map(
            ({ dayKey, day, date }) =>
              groundItinerary[dayKey]?.map((dayObj, index) => (
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
                  {dayObj.bulletPoints ? (
                    <BulletPoint
                      title={dayObj.task}
                      bulletPoints={dayObj.bulletPoints}
                    />
                  ) : (
                    <Row description={dayObj.description} style="text-start">
                      {dayObj.task}
                    </Row>
                  )}
                </Column>
              ))
          )}
        </div>
        <div className="mb-8">
          <h1 className="text-xl font-bold">Important Points</h1>
          <BulletPoint title={""} bulletPoints={importantPoints} />
        </div>
        <div className="mb-8">
          <h1 className="text-xl font-bold">Few Travel Tips</h1>
          <BulletPoint title={""} bulletPoints={travelTips} />
        </div>
        {transferFromMarariToAirport ? (
          <div className="mb-8">
            <h1 className="text-xl font-bold">
              Transfer from Marari Beach to Kochi Airport
            </h1>
            <BulletPoint title={""} bulletPoints={travelTips} />
          </div>
        ) : null}

        <div className="font-bold">Wishing you all happy and safe holiday!</div>
      </div>
      <button
        onClick={handleExportPDF}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded active:opacity-50"
      >
        Export to PDF
      </button>
    </div>
  );
}

export default EnchantingKerala;
