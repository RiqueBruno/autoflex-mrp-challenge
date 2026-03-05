import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "../layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <h1>Welcome to the Home Page</h1> },
      { path: "product", element: <h1>Product Page</h1> },
      { path: "raw-material", element: <h1>Raw Material Page</h1> },
    ],
  },
  { path: "*", element: <h1>404 Not Found</h1> },
]);
