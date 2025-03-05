import { lazy } from "react";
import CreatePdf from "../pages/CreatePdf";

// Unprotected routes
const Home = lazy(() => import("../pages/HomePage"));
const EnchantingKerala = lazy(() => import("../pages/EnchantingKerala"));

const routes = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
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
];

export default routes;
