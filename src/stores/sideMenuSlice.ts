import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {icons} from "../base-components/Lucide";

export interface Menu {
    icon: keyof typeof icons;
    title: string;
    pathname?: string;
    subMenu?: Menu[];
    ignore?: boolean;
}

export interface SideMenuState {
    menu: Array<Menu | "divider">;
}

const initialState: SideMenuState = {
    menu: [
        {
            icon: "Settings2",
            title: "Administration",
            subMenu: [
                {
                    icon: "UserCog",
                    title: "Users",
                    subMenu: [
                        {
                            icon: "Activity",
                            pathname: "/register",
                            title: "Create user",

                        },
                        {
                            icon: "Activity",
                            pathname: "/users",
                            title: "Users",
                        },
                    ],
                },
                {
                    icon: "Trello",
                    title: "Roles",
                    subMenu: [
                        {
                            icon: "Activity",
                            pathname: "/register",
                            title: "Create user",

                        },
                    ],
                },
            ],
        },
        "divider",
        {
            icon: "Users",
            title: "Customers",
            subMenu: [

                {
                    icon: "Activity",
                    pathname: "/customers",
                    title: "View customers",
                },
                {
                    icon: "Activity",
                    pathname: "/create-customer",
                    title: "Create customer",
                },
            ],
        },
        "divider",
        {
            icon: "Award",
            title: "Loan management",
            subMenu: [
                {
                    icon: "Gift",
                    title: "Loans",
                    subMenu: [
                        {
                            icon: "Activity",
                            pathname: "/create-loan",
                            title: "Create Loan",
                        },
                        {
                            icon: "Activity",
                            pathname: "/loans",
                            title: "Loans",
                        },
                    ],
                },
                {
                    icon: "Trello",
                    title: "Payments",
                    subMenu: [
                        {
                            icon: "Activity",
                            pathname: "/re-payment",
                            title: "Create-Payment",
                        },
                    ],
                },
                {
                    icon: "Trello",
                    title: "Collaterals",
                    subMenu: [
                        {
                            icon: "Activity",
                            pathname: "/create-collateral",
                            title: "Create collateral",
                        },
                    ],
                },
            ],
        },
        {
            icon: "Activity",
            pathname: "/modal",
            title: "Modal",
        },

    ],
};

export const sideMenuSlice = createSlice({
    name: "sideMenu",
    initialState,
    reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
