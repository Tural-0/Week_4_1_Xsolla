import "../styles/product.css";
import { useState } from "react";

export default function Product({ product, onIncrease, onDecrease, isInCart = true }) {

  const price = (product.price/100).toFixed(2)
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
          <p className="product-card__price-add__text">${price}</p>
          <div className={"product-card__price-add__addToCartButton"+soldText} onClick={addToCart}>
            <p className={"product-card__price-add__addToCartButton__text"+soldText}>{buttonText}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
