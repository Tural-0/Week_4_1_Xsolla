import { Link } from "react-router-dom";
import "../styles/navbar.css"
import cartImage from "../assets/CartIcon.png"
import logo from "../assets/Mark.png"

export default function Navbar(){

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
            <Link to="/orders" className="noDecoText">
                <p className="navbar-item__storetext">Orders</p>
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