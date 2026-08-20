import '../styles/checkout.css'
import { useState, useEffect, useReducer, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import LineProductList from "../components/LineProductList";
import { CartCtx } from "../context/CartContext";
import { useLocalStorage } from "../custom_hooks/useLocalStorage";
import { CART } from "../data/cart"

export default function CheckoutPage() {
  const [name, setName] = useLocalStorage("userName","")
  const [email, setEmail] = useLocalStorage("email","")
  const [address, setAddress] = useLocalStorage("address","")
  const [order, setOrder] = useLocalStorage("order",null)

  const navigate = useNavigate()
  
  const [cart, setPrdcs] = useState(CART)

  const totalPrice = (cart.reduce(
    (total, product) => ((total + product.price * product.count)),
    0
  ))/100;


  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents page reload

    const items = cart
      .filter(product => product.quantity > 0)
      .map(product => ({
        itemId: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
      }));

    if (items.length === 0){
      alert("Cart is empty")
      return
    }

    const orderDetails = {
      name, email, address, items, totalPrice
    }

    setOrder(prev => orderDetails)
    console.log('Form Submitted Data:', orderDetails);
  };

  return (
    <>
    <Navbar/>
    <div className={cart.length > 0 ? "checkout-page" : "checkout-page--empty"}>
      {cart.length > 0 ?
        <>
          <LineProductList/>
          <div className='checkout-page__orderSum'>
            <p className='checkout-page__orderSum__mainText'>Order summary</p>
            <div className='checkout-page__orderSum__subtotal'>
              <p className='checkout-page__orderSum__subtotal__text'>Subtotal</p>
              <p className='checkout-page__orderSum__subtotal__price'>${totalPrice}</p>
            </div>
            <div className='checkout-page__orderSum__delivery'>
              <p className='checkout-page__orderSum__delivery__text'>Delivery</p>
              <p className='checkout-page__orderSum__delivery__price'>Free</p>
            </div>
            <div className='checkout-page__orderSum__promo'>
              <p className='checkout-page__orderSum__promo__text'>Promo code</p>
              <input
                className='checkout-page__orderSum__promo_input'
                placeholder='XSOLLA10'
                type='text'/>
            </div>
            <hr className='checkout-page__orderSum__line'/>
            <div className='checkout-page__orderSum__total'>
              <p className='checkout-page__orderSum__total__text'>Total</p>
              <p className='checkout-page__orderSum__total__price'>${totalPrice+0}</p>
            </div>
            <button
              className='checkout-page__orderSum__orderButton'
              onClick={handleSubmit}
              >
                <p className='checkout-page__orderSum__orderButton__text'>Place order</p>
              </button>
            <p className='checkout-page__orderSum__terms'>By placing this order you agree to the Terms of Service.</p>
          </div>
        </>
        :
        <div className='checkout-page__emptyCart'>
          <div className='checkout-page__emptyCart__textDiv'>
            <p className='checkout-page__emptyCart__mainText'>Your cart is empty</p>
            <p className='checkout-page__emptyCart__subText'>Nothing here yet. The catalogue is one click away.</p>
          </div>
          <button className='checkout-page__emptyCart__button'>
            <p className='checkout-page__emptyCart__button__text' onClick={() => {navigate("/")}}>Browse the store</p>
          </button>
        </div>
      }
    </div>
    </>
  );
}