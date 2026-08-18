import logo from "../assets/Mark.png"
import "../styles/login.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";

export default function LoginPage() {

    const [formData, setFormData] = useState({ email: '' , password: ''});
    const [validEmailText, setValidEmailText] = useState("");
    const [validPasswordText, setValidPasswordText] = useState("");
    const navigate = useNavigate()

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValidEmail(formData.email)) {
            setValidEmailText("");
            if (formData.password.length>8){
                setValidPasswordText("");
                console.log(formData);
                navigate("/")
            }else{
                setValidPasswordText("--danger");
            }
        }else{
            setValidEmailText("--danger");
            setValidPasswordText("--danger");
        }
    };

  return(
  <>
    <div className="loginPage">
        <Link to="/" className="logo-item">
            <img src={logo} className="logo-item__logo"/>
            <p className="logo-item__logotext"><b>Xsolla Store</b></p>
        </Link>
        <form className="inputs" onSubmit={handleSubmit} noValidate>
            <p className="inputs__title">Sign in</p>
            <p className="inputs__description">Sign in to continue to checkout</p>

            <div className={"inputs__error"+validPasswordText}>
                <p className="inputs__error__text">Email or password is incorrect.</p>
            </div>

            <div className="inputs__email">
                <p className="inputs__email__text">Email</p>
                <input
                    type="email"
                    className={"inputs__input"+validEmailText}
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
                <p className={"inputs__email__errText"+validEmailText}>Email is incorrect.</p>
            </div>
            <div className="inputs__password">
                <p className="inputs__password__text">Password</p>
                <input
                    type="password"
                    className={"inputs__input"+validPasswordText}
                    placeholder="********"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
                <p className={"inputs__password__errText"+validPasswordText}>Password is incorrect.</p>
            </div>
            <button className="inputs__button" type="submit">
                <p className="inputs__button__text">Sign in</p>
            </button>
            <div className="inputs__extras">
                <p className="inputs__extras__text1">No account yet?</p>
                <Link to="/login" className="inputs__extras__text2">Create one</Link>
            </div>
        </form>
    </div>
  </>)
}