import "../styles/product.css";
import { useState } from "react";

export default function Product({ product, onIncrease, onDecrease, isInCart = true }) {

  const defaultPic = "https://images.unsplash.com/photo-1541480601022-2308c0f02487?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFuZG9tJTIwb2JqZWN0c3xlbnwwfHwwfHx8MA%3D%3D"
  let soldText = "";
  let buttonText = "Add to cart"

  if (product.stock == 0){
    soldText = "--sold";
    buttonText = "Sold out"
  }

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
    <>
    <div className="product-card">
      <div className={"product-card__gradient"+soldText}>
        <div className="product-card__gradient__circle">
          <p className="product-card__gradient__circle__text">{product.name[0]}</p>
        </div>
      </div>
      <div className="product-card__information">
        <p className="product-card__name">{product.name}</p>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__price-add">
          <p className="product-card__price-add__text">${product.price}</p>
          <div className={"product-card__price-add__addToCartButton"+soldText} onClick={addToCart}>
            <p className={"product-card__price-add__addToCartButton__text"+soldText}>{buttonText}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
