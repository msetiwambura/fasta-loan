import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";

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
      icon: "Activity",
      pathname: "/customers",
      title: "Customers",
    },
    {
      icon: "Activity",
      pathname: "/register",
      title: "Register",
    },
    {
      icon: "Activity",
      pathname: "/create-customer",
      title: "Create user",
    },
    {
      icon: "Activity",
      pathname: "/users",
      title: "Users",
    },
    {
      icon: "Activity",
      pathname: "/create-collateral",
      title: "Create collateral",
    },
    {
      icon: "Activity",
      pathname: "/login",
      title: "Login",
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
