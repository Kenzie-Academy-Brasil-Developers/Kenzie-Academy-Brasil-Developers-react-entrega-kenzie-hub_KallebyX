import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import TechProvider from "./context/TechContext";

createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <BrowserRouter>
         <UserProvider>
            <TechProvider>
               <App />
            </TechProvider>
         </UserProvider>
      </BrowserRouter>
   </React.StrictMode>
);
