import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import DashboardOverview1 from "../pages/DashboardOverview1";
import Register from "../pages/Register";
import Customers from "../pages/Customers";
import AddUser from "../pages/AddUser";
import SysUsers from "../pages/SysUsers";
import CreateLoan from "../pages/CreateLoan";
import CreateCollateral from "../pages/CreateCollateral";
import Login from "../components/Login";

function Router() {
  const routes = [
    {
      path: "/",
      element: <SideMenu />,
      children: [
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
          element: <AddUser/>,
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
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ];

  return useRoutes(routes);
}

export default Router;
