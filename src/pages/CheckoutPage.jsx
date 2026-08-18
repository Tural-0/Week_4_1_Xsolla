import Product from "../components/Product";
import '../styles/checkout.css'
import { useState, useEffect, useReducer, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CartCtx } from "../context/CartContext";

export default function CheckoutPage() {
  const [name, setName] = useLocalStorage("userName","")
  const [email, setEmail] = useLocalStorage("email","")
  const [address, setAddress] = useLocalStorage("address","")
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
  
  const totalPrice = products.reduce(
    (total, product) => Math.round((total + product.price * product.quantity) * 100)/100,
    0
  );

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents page reload

    const items = products
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
    <div className="container">
      {products.map(product => {
        if (product.quantity > 0){
          return(
            <Product
            key={product.id}
            product={product}
            onIncrease={() => dispatch({type:"INCREASE", id: product.id})}
            onDecrease={() => dispatch({type:"DECREASE", id: product.id})}/>
          )
        }
      })}

      <h2>Total: ${totalPrice.toFixed(2)}</h2>

      <div className="create">
        <h3>Checkout</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </div>

          <div>
            <label>Address:</label>
            <input
              type="text"
              placeholder="Your home address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    </>
  );
}