import React, { useRef } from "react";

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
// import { Document, Packer, Paragraph } from "docx";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { EMPTY_BULLETS, IMAGE_PATH } from "../constants/constants";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { savePdf } from "../redux/createPdfSlice";

function EnchantingKerala() {
  const location = useLocation();
  const {
    passengerList,
    selectedStartDate,
    selectedEndDate,
    selectedForm,
    confirmationNumber,
  } = location.state || {};

  let currentDate = selectedStartDate;
  const { pdfs } = useAppSelector((state) => state.client);
  const dispatch = useAppDispatch();

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
    imageName,
    main,
    groundItinerary,
    hotelItinerary,
    importantPoints,
    travelTips,
    transferFromMarariToAirport,
    flights,
    transportation,
    emergencyContacts,
    customBulletPoint,
  } = selectedForm;

  const { emergencyNumberUK } = emergencyContacts || "";

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
    hotelItinerary.forEach((hotelItinerary, index) =>
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

  return (
    <div>
      <div ref={contentRef} className="overflow-auto m-5">
        {/* Header Section */}
        <img
          className="m-10 w-44 h-44 cursor-pointer"
          src={`${IMAGE_PATH}/${imageName}`}
        />
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
            {hotelItinerary?.map((hotel, index) => (
              <Column>
                <Row>{hotel?.hotelName}</Row>
                <Row>{hotel?.roomType}</Row>
                <Row>
                  {generateCheckInDates(currentDate, hotelItinerary, index)}
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
                {generateCheckInDates(currentDate, hotelItinerary, index)}
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
            <Row style="text-start">Departure Kochi</Row>
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
          <h1 className="text-xl font-bold">Important Points</h1>
          <BulletPoint title={""} bulletPoints={importantPoints} />
        </div>
        {travelTips !== EMPTY_BULLETS ? (
          <div className="mb-8">
            <h1 className="text-xl font-bold">Few Travel Tips</h1>
            <BulletPoint title={""} bulletPoints={travelTips} />
          </div>
        ) : null}
        {customBulletPoint.title ? (
          <div className="mb-8">
            <h1 className="text-xl font-bold">{customBulletPoint.title}</h1>
            <BulletPoint
              title={""}
              bulletPoints={customBulletPoint.bulletPoints}
            />
          </div>
        ) : null}
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
      <div className="flex">
        <button
          onClick={handleExportPDF}
          className="bg-blue-500 text-white px-4 py-2 mx-auto  my-2 rounded active:opacity-50"
        >
          Export to PDF
        </button>
        {/* <button
          onClick={handleExportWord}
          className="bg-blue-500 text-white px-4 py-2 mx-auto my-2 rounded active:opacity-50"
        >
          Export to Word
        </button> */}
      </div>
    </div>
  );
}

export default EnchantingKerala;
