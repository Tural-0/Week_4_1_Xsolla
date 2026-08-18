import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartCtx } from "../context/CartContext";
import "../styles/navbar.css"
import Popup from "./Popup";
import CheckoutPage from "../pages/CheckoutPage";
import cartImage from "../assets/CartIcon.png"
import logo from "../assets/Mark.png"

export default function Navbar(){

    const [cartCount, setCartCount] = useState(0)

    const [order, setOrder] = useLocalStorage("order",null)

    const {products, dispatch} = useContext(CartCtx)

    function useLocalStorage(key, init) {
        const [value, setValue] =
            useState(() => {
                const stored =
                localStorage.getItem(key);
            return stored
                ? JSON.parse(stored)
                : init;
            });

        useEffect(() => {
            localStorage.setItem(
            key, JSON.stringify(value)
            );
        }, [key, value]);

        return [value, setValue];
    }
  
    useEffect(() => {
        products.map(product =>{
            if (order.items[product.id-1] != null){
                if (product.id === order.items[product.id-1].itemId){
                    product.quantity = order.items[product.id-1].quantity
                }
            }
        })
    }, [order]);
    
    useEffect(() => {
        setCartCount(prev => products.filter(
            p => p.quantity >= 1
        ).length)
    }, [products]);

    return(
    <div className="navbar">
        <div className="navbar-item--logo">
            <img src={logo} className="navbar-item__logo"/>
            <p className="navbar-item__logotext"><b>Xsolla Store</b></p>
        </div>
        <div className="navbar-item">
            <Link to="/" className="noDecoText">
                <p className="navbar-item__storetext">Store</p>
            </Link>
            <Link to="/checkout" className="noDecoText">
                <div className="navbar-item__cartButton">
                    <img src={cartImage} className="navbar-item__cartImg"/>
                    <p className="navbar-item__carttext">Cart</p>
                </div>
            </Link>
            <Link to="/login" className="noDecoText">
                <div className="navbar-item__loginButton">
                    <p className="navbar-item__logintext">Login</p>
                </div>
            </Link>
        </div>
    </div>
    )
}