import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext.jsx";
import { InvoiceProvider } from "./context/InvoiceContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <InvoiceProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </InvoiceProvider>
    </AuthProvider>
  </BrowserRouter>
);
  