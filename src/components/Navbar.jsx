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

    const {products, dispatch} = useContext(CartCtx)
    
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