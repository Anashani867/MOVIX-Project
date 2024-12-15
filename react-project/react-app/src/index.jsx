import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { AuthProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);