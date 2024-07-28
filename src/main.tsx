// main.tsx or index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import Router from "./router";
import ScrollToTop from "./base-components/ScrollToTop";
import ChannelLogin from "./utils/ChannelLogin"; // Ensure this path is correct
import "./assets/css/app.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <Provider store={store}>
            <ChannelLogin>
                <Router />
            </ChannelLogin>
        </Provider>
        <ScrollToTop />
    </BrowserRouter>
);
