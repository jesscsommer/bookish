import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import "./index.css";
import { BookProvider } from "./context/bookContext"
import { BookShelfProvider } from "./context/bookShelfContext"
import { ShelfProvider } from "./context/shelfContext"
import { UserProvider } from "./context/userContext";
import { ReviewProvider } from "./context/reviewContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <UserProvider>
            <BookProvider>
                <ReviewProvider>
                    <ShelfProvider>
                        <BookShelfProvider>
                                <BrowserRouter>
                                    <App />
                                </BrowserRouter>
                        </BookShelfProvider>
                    </ShelfProvider>
                </ReviewProvider>
            </BookProvider>
    </UserProvider>
);