import React, { useState } from "react";

export default function AddHotel() {
  const [hotels, setHotels] = useState([
    {
      hotelName: "",
      roomType: "",
      checkIn: "",
      duration: "",
      rooms: "",
      mealPlan: "",
      status: "",
    },
  ]);

  const handleAddHotel = () => {
    setHotels([
      ...hotels,
      {
        hotelName: "",
        roomType: "",
        checkIn: "",
        duration: "",
        rooms: "",
        mealPlan: "",
        status: "",
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedHotels = hotels.map((hotel, i) =>
      i === index ? { ...hotel, [field]: value } : hotel
    );
    setHotels(updatedHotels);
  };

  const renderHotelFields = () => {
    return hotels.map((hotel, index) => (
      <div key={index} className="mb-6 border-b pb-4">
        <h2 className="text-lg font-medium mb-2">Hotel {index + 1}</h2>
        <div className="mb-4">
          <label
            className="block text-lg font-medium mb-2"
            htmlFor={`hotelName-${index}`}
          >
            Hotel Name
          </label>
          <input
            type="text"
            id={`hotelName-${index}`}
            name={`hotelName-${index}`}
            value={hotel.hotelName}
            onChange={(e) =>
              handleInputChange(index, "hotelName", e.target.value)
            }
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-lg font-medium mb-2"
            htmlFor={`roomType-${index}`}
          >
            Room Type
          </label>
          <input
            type="text"
            id={`roomType-${index}`}
            name={`roomType-${index}`}
            value={hotel.roomType}
            onChange={(e) =>
              handleInputChange(index, "roomType", e.target.value)
            }
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-lg font-medium mb-2"
            htmlFor={`duration-${index}`}
          >
            Duration
          </label>
          <input
            type="text"
            id={`duration-${index}`}
            name={`duration-${index}`}
            value={hotel.duration}
            onChange={(e) =>
              handleInputChange(index, "duration", e.target.value)
            }
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-lg font-medium mb-2"
            htmlFor={`rooms-${index}`}
          >
            Room(s)
          </label>
          <input
            type="number"
            id={`rooms-${index}`}
            name={`rooms-${index}`}
            value={hotel.rooms}
            onChange={(e) => handleInputChange(index, "rooms", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-lg font-medium mb-2"
            htmlFor={`mealPlan-${index}`}
          >
            Meal Plan
          </label>
          <input
            type="text"
            id={`mealPlan-${index}`}
            name={`mealPlan-${index}`}
            value={hotel.mealPlan}
            onChange={(e) =>
              handleInputChange(index, "mealPlan", e.target.value)
            }
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-lg font-medium mb-2"
            htmlFor={`status-${index}`}
          >
            Status
          </label>
          <input
            type="text"
            id={`status-${index}`}
            name={`status-${index}`}
            value={hotel.status}
            onChange={(e) => handleInputChange(index, "status", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mb-10">
      <h1 className="text-2xl font-bold mb-6">Enter Hotel Details</h1>
      <form>
        {renderHotelFields()}
        <button
          type="button"
          onClick={handleAddHotel}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 mb-4"
        >
          Add Another Hotel
        </button>
      </form>
    </div>
  );
}
