import { lazy } from "react";
import ChangePassword from "../pages/ChangePassword";
import SavedPdfs from "../pages/SavedPdfs";

// Unprotected routes
const Home = lazy(() => import("../pages/HomePage"));
const EnchantingKerala = lazy(() => import("../pages/EnchantingKerala"));
const Login = lazy(() => import("../pages/Login"));
const AddDetails = lazy(() => import("../pages/AddDetails"));
const CreatePdf = lazy(() => import("../pages/CreatePdf"));
const routes = [
  {
    name: "Login",
    path: "/login",
    element: <Login />,
  },
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "AddDetails",
    path: "/add-details",
    element: <AddDetails />,
  },
  {
    name: "SavedPdfs",
    path: "/view-saved",
    element: <SavedPdfs />,
  },

  {
    name: "PDFView",
    path: "/pdf-view",
    element: <EnchantingKerala />,
  },
  {
    name: "CreatePDF",
    path: "/create-pdf",
    element: <CreatePdf />,
  },
  {
    name: "ChangePassword",
    path: "/change-password",
    element: <ChangePassword />,
  },
];

export default routes;
