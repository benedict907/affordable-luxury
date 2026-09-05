import React, { lazy } from "react";
import RequireAuth from "./RequireAuth";

const Home = lazy(() => import("../pages/HomePage"));
const EnchantingKerala = lazy(() => import("../pages/EnchantingKerala"));
const Login = lazy(() => import("../pages/Login"));
const AddDetails = lazy(() => import("../pages/AddDetails"));
const CreatePdf = lazy(() => import("../pages/CreatePdf"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const SavedPdfs = lazy(() => import("../pages/SavedPdfs"));
const ChangePassword = lazy(() => import("../pages/ChangePassword"));

const routes = [
  {
    name: "Login",
    path: "/login",
    element: <Login />,
  },
  {
    name: "Home",
    path: "/",
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    name: "AddDetails",
    path: "/add-details",
    element: (
      <RequireAuth>
        <AddDetails />
      </RequireAuth>
    ),
  },
  {
    name: "SavedPdfs",
    path: "/view-saved",
    element: (
      <RequireAuth>
        <SavedPdfs />
      </RequireAuth>
    ),
  },
  {
    name: "PDFView",
    path: "/pdf-view",
    element: (
      <RequireAuth>
        <EnchantingKerala />
      </RequireAuth>
    ),
  },
  {
    name: "CreatePDF",
    path: "/create-pdf",
    element: (
      <RequireAuth>
        <CreatePdf />
      </RequireAuth>
    ),
  },
  {
    name: "ChangePassword",
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    name: "ContactUs",
    path: "/contact-us",
    element: <ContactUs />,
  },
];

export default routes;
