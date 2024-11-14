import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductProdvider } from "./contexts/ProductContext.tsx";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext.tsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ShoppingCartProvider>
      <ProductProdvider>
        <App />
      </ProductProdvider>
    </ShoppingCartProvider>
    <ToastContainer />
  </React.StrictMode>
);
