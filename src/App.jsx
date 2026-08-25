import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import CheckoutPage from "./pages/CheckoutPage";
import AddProductPage from "./pages/AddProductPage";
import LoginPage from "./pages/LogInPage";
import OrdersPage from "./pages/OrdersPage";
import Footer from "./components/Footer";

import { ProductProvider } from "./context/ProductContext";
import { useTheme } from "./custom_hooks/useTheme";

import "./App.css"
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
    <div className="body">
    <div className="main">

    <ProductProvider>
    <CartProvider>
    <OrderProvider>



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
        <Route path="/orders" element={
          <OrdersPage/>
        } />
      </Routes>
    </BrowserRouter>

    </OrderProvider>
    </CartProvider>
    </ProductProvider>
    
    </div>
    <Footer className="footer"
        theme={theme}
        onToggleTheme={toggleTheme}
        />
    </div>
    </>
  );
}

export default App