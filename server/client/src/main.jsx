import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UserProvider } from "./context/UserContext.jsx";
import { PetProvider } from "./context/PetContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import { ResponseProvider } from "./context/ResponseContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ResponseProvider>
      <UserProvider>
        <PetProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </PetProvider>
      </UserProvider>
    </ResponseProvider>
  </BrowserRouter>
);
