import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PRODUCTS } from "./data/products";
import { useState, useReducer, useEffect, createContext } from "react";

import ProductsPage from "./pages/ProductsPage";
import CheckoutPage from "./pages/CheckoutPage";
import AddProductPage from "./pages/AddProductPage";
import LoginPage from "./pages/LogInPage";
import Footer from "./components/Footer";

import { CartProvider } from "./context/CartContext";
import { useTheme } from "./custom_hooks/useTheme";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
    <CartProvider>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProductsPage/>
        } />
        <Route path="/checkout" element={
          <CheckoutPage/>
        } />
        <Route path="/addProduct" element={
          <AddProductPage/>
        } />
        <Route path="/login" element={
          <LoginPage/>
        } />
      </Routes>
    </BrowserRouter>
    </CartProvider>
    <Footer
        theme={theme}
        onToggleTheme={toggleTheme}
        />
    </>
  );
}

export default App