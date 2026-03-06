import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "../layouts/MainLayout";
import { RawMaterials } from "../pages/RawMaterials";
import { Products } from "../pages/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <h1>Welcome to the Home Page</h1> },
      { path: "product", element: <Products /> },
      { path: "raw-material", element: <RawMaterials /> },
    ],
  },
  { path: "*", element: <h1>404 Not Found</h1> },
]);
