import "../styles/product.css";
import { useState } from "react";

export default function Product({ product, onIncrease, onDecrease, isInCart = true }) {

  const defaultPic = "https://images.unsplash.com/photo-1541480601022-2308c0f02487?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tJTIwb2JqZWN0c3xlbnwwfHwwfHx8MA%3D%3D"

  function addToCart(){
    if (product.quantity <= 0){
      onIncrease(product.id)
    }else{
      alert("Already in cart")
    }
  }

  function removeFromCart(){
    for (let i = 0; i < product.quantity; i++){
      onDecrease(product.id)
    }
  }

  return (
    <div className="product">
      <div>
        <img src={product.imageUrl === "" ? defaultPic : product.imageUrl} alt="pic"/>
      </div>

      <div>
        <h3>{product.name}</h3>
        <p>Digital product</p>
      </div>

      <span className="price">${product.price}</span>

      <div className="quantity">
        {
          isInCart
          ?
          <>
          <button
            id="minus"
            onClick={() => onDecrease(product.id)}
            disabled={product.quantity <= 0}
            >-</button>
          <span id="quantity">{product.quantity}</span>
          <button id="plus" onClick={() => onIncrease(product.id)}>+</button>
          <button onClick={removeFromCart}>Remove from cart</button>
          </>
          :
          <>
          <button onClick={addToCart}>Add to cart</button>
          </>
        }
      </div>

    </div>
  );
}
