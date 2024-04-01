import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UserProvider } from "./context/UserContext.jsx";
import { PetProvider } from "./context/PetContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <PetProvider>
        <App />
      </PetProvider>
    </UserProvider>
  </BrowserRouter>
);
