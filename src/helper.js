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

    result.push({ day, date: `${date}-${month}` });
  }
  console.log("result", { startDate, days });
  return result;
};

export const generateCheckInDates = (startDate, hotel, index) => {
  const currentDate = new Date(startDate);
  let totalNights = 0;
  for (let i = 0; i <= index; i++) {
    totalNights = i === 0 ? 0 : totalNights + hotel[i - 1]?.duration;
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

export const getDailyTasks = (itinerary) => {
  const days = Object.keys(itinerary);
  const mappedTasks = {};

  days.forEach((day) => {
    mappedTasks[day] = itinerary[day].map((task, index) => {
      const { time, task: taskDescription, bulletPoints } = task;
      return {
        index: index + 1,
        time: time || "",
        description: taskDescription,
        details: bulletPoints || [],
      };
    });
  });

  return mappedTasks;
};

export const setValueByKeyPath = (obj, keyPath, value) => {
  // Split by dot, but keep array indices intact (e.g., "hotelItinerary[0]" remains together)
  const keys = keyPath.match(/[^.[\]]+/g); // Regex to extract keys and indices
  let current = obj;

  keys.forEach((key, index) => {
    console.log("rrrrs", { key, index });
    // Check if the key is the last one
    if (index === keys.length - 1) {
      current[key] = value; // Assign the value at the last key
    } else {
      // If key is an array index
      if (!isNaN(key)) {
        key = parseInt(key, 10); // Convert index to number
      }
      // If the key doesn't exist, create an object or array
      if (!current[key]) {
        current[key] = isNaN(keys[index + 1]) ? {} : [];
      }
      current = current[key]; // Move deeper into the object or array
    }
  });
};
