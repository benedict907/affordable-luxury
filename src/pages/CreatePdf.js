import React from "react";
import AddHotel from "../components/AddHotel";
import AddTransport from "../components/AddTransport";
import FlightDetails from "../components/FlightDetails";
import EmergencyContacts from "../components/EmergencyContacts";
import PackageDetails from "../components/PackageDetails";
import GroundItinerary from "../components/GroundItinerary";

const App = () => {
  return (
    <div className="min-h-screen flex-col bg-gray-100 flex justify-center items-center">
      <PackageDetails />
      <AddHotel />
      <FlightDetails />
      <AddTransport />
      <EmergencyContacts />
      <GroundItinerary />
    </div>
  );
};

export default App;
