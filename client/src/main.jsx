import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import InitialRefreshToken from "./context/InitialRefreshToken.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <InitialRefreshToken>
        <App />
      </InitialRefreshToken>
    </AuthProvider>
  </BrowserRouter>
);
