import React, { useEffect, useRef, useState } from "react";
import AddHotel from "../components/AddHotel";
import AddTransport from "../components/AddTransport";
import FlightDetails from "../components/FlightDetails";
import EmergencyContacts from "../components/EmergencyContacts";
import PackageDetails from "../components/PackageDetails";
import GroundItinerary from "../components/GroundItinerary";
import ImportantPoints from "../components/ImportantPoints";
import TravelTips from "../components/Travel Tips";
import { useAppDispatch, useAppSelector } from "../redux/store";

import * as Yup from "yup";
import {
  editPdf,
  resetPage,
  savePdf,
  setEditData,
  setErrors,
  setFlightDetails,
} from "../redux/createPdfSlice";
import CustomBulletPoint from "../components/CustomBulletPoint";
import { useLocation, useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isEdit, setEdit] = useState(false);
  const [pdfId, setPdfId] = useState();

  const refs = {
    "main.title": useRef(null),
    "main.numberOfDays": useRef(null),
    "flights.arrivalCity": useRef(null),
    "flights.arrivalFlightNumber": useRef(null),
    "flights.arrivalTime": useRef(null),
    "flights.departureCity": useRef(null),
    "flights.departureFlightNumber": useRef(null),
    "flights.departureTime": useRef(null),
  };

  useEffect(() => {
    const {
      imageName,
      main,
      hotelItinerary,
      flights,
      transportation,
      emergencyContacts,
      groundItinerary,
      importantPoints,
      travelTips,
      _id,
    } = location.state || {};

    if (main) {
      setPdfId(_id);
      setEdit(true);
      dispatch(
        setEditData({
          imageName,
          main,
          hotelItinerary,
          flights,
          transportation,
          emergencyContacts,
          groundItinerary,
          importantPoints,
          travelTips,
          customBulletPoint,
        })
      );
    }
  }, [location]);

  const {
    imageName,
    main,
    hotelItinerary,
    flights,
    transportation,
    emergencyContacts,
    groundItinerary,
    importantPoints,
    travelTips,
    customBulletPoint,
    success,
  } = useAppSelector((state) => state.createPdf);

  useEffect(() => {
    // Scroll to top on navigation
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (success) {
      dispatch(resetPage());
      navigate("/");
    }
    return () => {
      dispatch(resetPage());
    };
  }, [success]);

  const onSavePressed = async () => {
    let response = {
      main,
      flights,
      emergencyContacts,
      transportation,
      hotelItinerary,
      groundItinerary,
      importantPoints,
      travelTips,
      customBulletPoint,
    };
    const formData = new FormData();

    formData.append("main", JSON.stringify(main));

    formData.append("flights", JSON.stringify(flights));
    formData.append("importantPoints", JSON.stringify(importantPoints));
    formData.append("travelTips", JSON.stringify(travelTips));
    formData.append("customBulletPoint", JSON.stringify(customBulletPoint));
    formData.append("emergencyContacts", JSON.stringify(emergencyContacts));

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

    try {
      await validationSchema.validate(response, { abortEarly: false });
      if (isEdit) {
        dispatch(editPdf({ formData, pdfId }));
      } else {
        dispatch(savePdf(formData));
      }
    } catch (err) {
      if (err.inner && err.inner.length > 0) {
        for (let i = 0; i < err.inner.length; i++) {
          const firstErrorField = err.inner[i].path;

          dispatch(
            setErrors({
              key: firstErrorField,
              error: err.inner[i].message,
            })
          );
          if (i == 0) {
            const firstErrorRef = refs[firstErrorField];
            if (firstErrorRef && firstErrorRef.current) {
              firstErrorRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              firstErrorRef.current.focus();
            }
          }
        }

        // errors[firstErrorField];
      }
    }
  };
  const validationSchema = Yup.object({
    main: Yup.object({
      title: Yup.string().required("Title is required"),
      numberOfDays: Yup.number()
        .required("Days are required")
        .min(1, "Days must be greater than 0"),
    }),
    hotelItinerary: Yup.array().of(
      Yup.object({
        duration: Yup.number().required("Duration is required"),
        hotelName: Yup.string().required("Hotel name is required"),
        mealPlan: Yup.string().required("Meal plan is required"),
        roomType: Yup.string().required("Room type is required"),
        rooms: Yup.number().required("Number of rooms is required"),
        status: Yup.string().required("Status is required"),
      })
    ),
    // flights: Yup.object({
    //   arrivalCity: Yup.string().required("Arrival city is required"),
    //   arrivalFlightNumber: Yup.string().required("Flight number is required"),
    //   arrivalTime: Yup.string().required("Arrival time is required"),
    //   departureCity: Yup.string().required("Departure city is required"),
    //   departureFlightNumber: Yup.string().required("Flight number is required"),
    //   departureTime: Yup.string().required("Departure time is required"),
    // }),
    transportation: Yup.array().of(
      Yup.object({
        transfers: Yup.string().required("Transfer is required"),
        service: Yup.string().required("Service is required"),
        status: Yup.string().required("Status is required"),
      })
    ),
  });
  //adding this to add the flight details when the component mounts so that validation does not fail in the backend
  //not clearing the DB because deploying the backend is complicated.
  // useEffect(() => {
  //   dispatch(
  //     setFlightDetails({
  //       arrivalCity: "_",
  //       arrivalFlightNumber: "a",
  //       arrivalTime: "a",
  //       departureCity: "a",
  //       departureFlightNumber: "a",
  //       departureTime: "a",
  //     })
  //   );
  // }, []);

  return (
    <div className="min-h-screen flex-col bg-gray-100 flex justify-center items-center">
      <ImageUploader />
      <PackageDetails ref={refs} />
      <AddHotel ref={refs} />
      {/* <FlightDetails ref={refs} /> */}
      <AddTransport ref={refs} />
      <EmergencyContacts ref={refs} />
      <GroundItinerary ref={refs} />
      <ImportantPoints ref={refs} />
      <TravelTips ref={refs} />
      <CustomBulletPoint />

      <button
        type="button"
        onClick={onSavePressed}
        className="bg-orange-400 w-1/2 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring focus:ring-blue-300 mb-10"
      >
        {isEdit ? "Update PDF" : "Save PDF"}
      </button>
    </div>
  );
};

export default App;
