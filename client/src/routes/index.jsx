import { createBrowserRouter } from "react-router";

import MainLayOut from "../layouts/MainLayOut";
import Login from "../pages/Login";
import Register from "../pages/Register";

import { Home } from "../pages/Home";
import NotFound from "../pages/NotFound";
import AddActivity from "../pages/AddActivity";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add-activity",
        element: <AddActivity />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
