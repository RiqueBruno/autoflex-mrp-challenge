import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "../layouts/MainLayout";
import { RawMaterials } from "../pages/RawMaterials";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <h1>Welcome to the Home Page</h1> },
      { path: "product", element: <h1>Product Page</h1> },
      { path: "raw-material", element: <RawMaterials /> },
    ],
  },
  { path: "*", element: <h1>404 Not Found</h1> },
]);
