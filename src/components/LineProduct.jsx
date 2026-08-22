import "../styles/lineproduct.css";
import { useState } from "react";

export default function LineProduct({ product, onIncrease, onDecrease, isInCart = true }) {

  const price = (product.price/100).toFixed(2)
  let soldText = "";

  function addToCart(){
    if (product.stock > 0){
      onIncrease()
    }else{
      alert("No stock remaining")
    }
  }

  function decreaseFromCart(){
    if (product.quantity >= 1){
      onDecrease()
    }else{
      alert("This item is not in the cart")
    }
  }

  function removeFromCart(){
    for (let i = 0; i < product.quantity; i++){
      onDecrease()
    }
  }

  return (
    <>
    <div className="lineproduct-cardParent">
    <div className="lineproduct-card">
        <div className={"lineproduct-card__gradient"+soldText}>
            <p className="lineproduct-card__gradient__circle__text">{product.name[0]}</p>
        </div>
        <div className="lineproduct-card__infoTexts">
            <p className="lineproduct-card__name">{product.name}</p>
            <p className="lineproduct-card__stockInfo">{product.stock + " in stock"}</p>
        </div>
        <div className="lineproduct-card__count-card-whole">
            <div className="lineproduct-card__count-card">
                <button className="lineproduct-card__count-card__minusButton" onClick={decreaseFromCart}>
                    <p className="lineproduct-card__count-card__minusText">−</p>
                </button>
                <p className="lineproduct-card__count-card__text">{product.quantity}</p>
                <button className="lineproduct-card__count-card__minusButton" onClick={addToCart}>
                    <p className="lineproduct-card__count-card__minusText">+</p>
                </button>
            </div>
            <p className="lineproduct-card__count-card__priceText">${price}</p>
            <button className="lineproduct-card__count-card__deleteButton" onClick={removeFromCart}>
                <p className="lineproduct-card__count-card__deleteButton__text">×</p>
            </button>
        </div>
    </div>
    </div>
    </>
  );
}
