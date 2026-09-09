import '../styles/checkout.css'
import { useState, useEffect, useReducer, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import LineProductList from "../components/LineProductList";
import { useLocalStorage } from "../custom_hooks/useLocalStorage";
import { CartCtx } from "../context/CartContext";
import { OrderCtx } from '../context/OrderContext';

export default function CheckoutPage() {

  const navigate = useNavigate()
  
  const [promo, setPromo] = useState("");

  const {cart, loadCart, delUserCart} = useContext(CartCtx)
  const {
    order,
    placeOrder,
    status,
    error
  } = useContext(OrderCtx)

  useEffect(() => {
    loadCart()
  },[])

  const totalPrice = ((cart || []).reduce(
    (total, product) => ((total + product.price * product.quantity)),
    0
  )/100).toFixed(2);
  

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents page reload

    const items = cart
      .map(product => ({
        item_id: product.id,
        quantity: product.quantity,
        price: product.price,
      }));
    
    const total = cart.reduce(
      (total, product) => ((total + product.price * product.quantity))
      ,0)
    

    if (items.length === 0){
      alert("Cart is empty")
      return
    }

    placeOrder(items, total, promo);
  };

  useEffect(() => {
    if (status === "success" && cart.length != 0){
      console.log('Order response Data:', order);
    }
  }, [status]);

  return (
    <>
    <Navbar/>
    <div className={((cart || [])).length > 0 ? "checkout-page" : "checkout-page--empty"}>
      {((cart || [])).length > 0 ?
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
                type='text'
                value={promo}
                onChange={(e) => setPromo(e.target.value)}/>
            </div>
            <hr className='checkout-page__orderSum__line'/>
            <div className='checkout-page__orderSum__total'>
              <p className='checkout-page__orderSum__total__text'>Total</p>
              <p className='checkout-page__orderSum__total__price'>${totalPrice}</p>
            </div>
            <button
              className='checkout-page__orderSum__orderButton'
              onClick={handleSubmit}
              disabled={status === "loading"}
              >
                <p className='checkout-page__orderSum__orderButton__text'>{ status === "loading" ? "Loading..." : "Place order"}</p>
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