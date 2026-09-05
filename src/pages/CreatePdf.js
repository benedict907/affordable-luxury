import React, { useEffect, useRef, useState } from "react";
import AddHotel from "../components/AddHotel";
import AddTransport from "../components/AddTransport";
import EmergencyContacts from "../components/EmergencyContacts";
import PackageDetails from "../components/PackageDetails";
import GroundItinerary from "../components/GroundItinerary";
import ImportantPoints from "../components/ImportantPoints";
import TravelTips from "../components/TravelTips";
import { useAppDispatch, useAppSelector } from "../redux/store";

import * as Yup from "yup";
import {
  clearErrors,
  editPdf,
  resetPage,
  savePdf,
  setEditData,
  setErrors,
} from "../redux/createPdfSlice";
import CustomBulletPoint from "../components/CustomBulletPoint";
import { useLocation, useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";

const CreatePdf = () => {
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
      customBulletPoint,
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
          customBulletPoint: customBulletPoint ?? {
            title: "",
            bulletPoints: "",
          },
        })
      );
    }
  }, [location, dispatch]);

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
  }, [success, dispatch, navigate]);

  const onSavePressed = async () => {
    dispatch(clearErrors());
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
      const action = isEdit ? editPdf({ formData, pdfId }) : savePdf(formData);
      dispatch(action)
        .unwrap()
        .then((res) => {
          if (isEdit && res?.message) alert(res.message);
        })
        .catch((apiErr) => alert(apiErr?.error ?? "Something went wrong."));
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
          if (i === 0) {
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
  // Note: flight details are captured on the AddDetails page, not here.
  return (
    <div className="app-page flex-col flex justify-center items-center">
      <ImageUploader />
      <PackageDetails ref={refs} />
      <AddHotel ref={refs} />
      <AddTransport ref={refs} />
      <EmergencyContacts />
      <GroundItinerary />
      <ImportantPoints />
      <TravelTips />
      <CustomBulletPoint />

      <button
        type="button"
        onClick={onSavePressed}
        className="btn btn-primary w-1/2 mb-10"
      >
        {isEdit ? "Update PDF" : "Save PDF"}
      </button>
    </div>
  );
};

export default CreatePdf;
