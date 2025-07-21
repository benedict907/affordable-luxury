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

export const checkIfExists = (pdfs, confirmationNumber, callback) => {
  const isExist =
    pdfs?.filter(
      (item) =>
        item?.confirmationDetails?.confirmationNumber === confirmationNumber
    ).length > 0;

  callback(isExist);
};
