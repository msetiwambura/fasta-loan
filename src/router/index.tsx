import { useRoutes, Navigate } from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import Register from "../pages/Register";
import Customers from "../pages/Customers";
import AddUser from "../pages/AddUser";
import SysUsers from "../pages/SysUsers";
import CreateLoan from "../pages/CreateLoan";
import CreateCollateral from "../pages/CreateCollateral";
import Login from "../components/Login";
import ProtectedRoute from "../utils/ProtectedRoute"; // Import the protected route component

function Router() {
  const routes = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap protected routes
      children: [
        {
          path: "/",
          element: <SideMenu/>, // Default redirect
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "customers",
          element: <Customers />,
        },
        {
          path: "create-customer",
          element: <AddUser />,
        },
        {
          path: "users",
          element: <SysUsers />,
        },
        {
          path: "create-loan",
          element: <CreateLoan />,
        },
        {
          path: "create-collateral",
          element: <CreateCollateral />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    // Redirect to login page if no routes match
    {
      path: "*",
      element: <Navigate to="/login" />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
