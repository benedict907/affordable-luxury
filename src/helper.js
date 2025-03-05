import {
  groundItinerary as enchantingKeralaGroundItinerary,
  hotelItinerary as enchantingKeralaHotelItinerary,
  transportationDocument as enchantingKeralaTransportation,
  importantPoints as enchantingKeralaImportantPoints,
  travelTips as enchantingKeralaTravelTips,
} from "./constants/enchantingKeralaConstants";
import {
  groundItinerary as keralaRetreatGroundItinerary,
  hotelItinerary as keralaRetreatHotelItinerary,
  transportationDocument as keralaRetreatTransportationDocument,
  importantPoints as keralaRetreatImportantPoints,
  travelTips as keralaRetreatTravelTips,
} from "./constants/keralaRetreatConstants";

import {
  groundItinerary as classicKeralaGroundItinerary,
  hotelItinerary as classicKeralaHotelItinerary,
  transportationDocument as classicKeralaTransportationDocument,
  importantPoints as classicKeralaImportantPoints,
  travelTips as classicKeralaTravelTips,
  transferFromMarariToAirport,
  emergencyContacts,
} from "./constants/classicKeralaBackwaters";

export const generateDateArray = (startDate, days) => {
  const result = [];
  const start = new Date(startDate);

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);

    const day = i + 1;
    const date = currentDate.getDate();
    const month = currentDate.toLocaleString("default", { month: "short" });

    result.push({ dayKey: `day${day}`, day, date: `${date}-${month}` });
  }

  return result;
};

export const generateCheckInDates = (startDate, hotel, index) => {
  const currentDate = new Date(startDate);
  let totalNights = 0;
  for (let i = 0; i <= index; i++) {
    totalNights = i === 0 ? 0 : totalNights + hotel[i - 1].durationNights;
  }

  currentDate.setDate(currentDate.getDate() + totalNights);

  // setCurrentDate(currentDate);
  const date = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "short" });

  return `${date}-${month}`;
};

export const formatDateToDDMMYYYY = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formLists = [
  { title: "Enchanting Kerala 15 nights & 16 Days", days: 15 },
  { title: "Kerala Retreat 9 nights & 10 days", days: 9 },
  { title: "Classic Kerala & Backwaters 10 Nights & 11 days", days: 10 },
  {
    title: "Enchanting Kerala 13 nights & 14 - Days Fragrant Nature",
    days: 13,
  },
  { title: "Enchanting Kerala 13 nights & 14 Days", days: 13 },
];

export const getConstantData = (title) => {
  console.log("title", title);
  switch (title) {
    case "Enchanting Kerala 15 nights & 16 Days":
      return {
        groundItinerary: enchantingKeralaGroundItinerary,
        hotelItinerary: enchantingKeralaHotelItinerary,
        importantPoints: enchantingKeralaImportantPoints,
        travelTips: enchantingKeralaTravelTips,
        transportationDocument: enchantingKeralaTransportation,
      };
    case "Kerala Retreat 9 nights & 10 days":
      return {
        groundItinerary: keralaRetreatGroundItinerary,
        hotelItinerary: keralaRetreatHotelItinerary,
        importantPoints: keralaRetreatImportantPoints,
        travelTips: keralaRetreatTravelTips,
        transportationDocument: keralaRetreatTransportationDocument,
      };
    case "Classic Kerala & Backwaters 10 Nights & 11 days":
      return {
        groundItinerary: classicKeralaGroundItinerary,
        hotelItinerary: classicKeralaHotelItinerary,
        importantPoints: classicKeralaImportantPoints,
        travelTips: classicKeralaTravelTips,
        transportationDocument: classicKeralaTransportationDocument,
        transferFromMarariToAirport,
      };
    case "Enchanting Kerala 13 nights & 14 - Days Fragrant Nature":
      return "";
    case "Enchanting Kerala 13 nights & 14 Days":
      return "";
    default:
      return "asdasdas";
  }
};

export const getEmergencyContacts = (title) => {
  switch (title) {
    case "Enchanting Kerala 15 nights & 16 Days":
      return "Emergency Contact UK:";
    case "Kerala Retreat 9 nights & 10 days":
      return "Emergency Contact UK:";
    case "Classic Kerala & Backwaters 10 Nights & 11 days":
      return emergencyContacts;
  }
};
