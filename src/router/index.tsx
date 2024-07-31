import { useRoutes, Navigate, Outlet } from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import Register from "../pages/Register";
import Customers from "../pages/Customers";
import AddUser from "../pages/AddCustomer";
import SysUsers from "../pages/SysUsers";
import CreateLoan from "../pages/CreateLoan";
import CreateCollateral from "../pages/CreateCollateral";
import Login from "../components/Login";
import ProtectedRoute from "../utils/ProtectedRoute";
import Loans from "../pages/Loans";
import Modal from "../pages/Modal";
import Payment from "../pages/Payment";

function Router() {
    const routes = [
        {
            path: "/",
            element: (
                <>
                    <SideMenu />
                    <Outlet />
                </>
            ),
            children: [
                {
                    path: "register",
                    element: (
                        <ProtectedRoute>
                            <Register />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "customers",
                    element: (
                        <ProtectedRoute>
                            <Customers />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "create-customer",
                    element: (
                        <ProtectedRoute>
                            <AddUser />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "users",
                    element: (
                        <ProtectedRoute>
                            <SysUsers />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "create-loan",
                    element: (
                        <ProtectedRoute>
                            <CreateLoan />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "create-collateral",
                    element: (
                        <ProtectedRoute>
                            <CreateCollateral />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "loans",
                    element: (
                        <ProtectedRoute>
                            <Loans />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "re-payment",
                    element: (
                        <ProtectedRoute>
                            <Payment />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "modal",
                    element: (
                        <ProtectedRoute>
                            <Modal />
                        </ProtectedRoute>
                    ),
                },
                // {
                //     path: "admin",
                //     element: (
                //         <ProtectedRoute>
                //             <Administration />
                //         </ProtectedRoute>
                //     ),
                // },
            ],
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "*",
            element: <Navigate to="/login" />,
        },
    ];

    return useRoutes(routes);
}

export default Router;
