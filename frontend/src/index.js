import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";

import { GlobalStyle } from "./Styles/globalStyle";
import { BrowserRouter } from "react-router-dom";
import { Providers } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <Providers>
        <Toaster />
        <App />
      </Providers>
    </BrowserRouter>
  </React.StrictMode>
);
