import "../styles/lineproduct.css";
import { useState } from "react";

export default function LineProduct({ product, onIncrease, onDecrease, isInCart = true }) {

  const price = (product.price/100).toFixed(2)
  let soldText = "";
  let buttonText = "Add to cart"

  if (product.stock == 0){
    soldText = "--sold";
    buttonText = "Sold out"
  }

  function removeFromCart(){
    for (let i = 0; i < product.quantity; i++){
      onDecrease(product.id)
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
                <button className="lineproduct-card__count-card__minusButton">
                    <p className="lineproduct-card__count-card__minusText">−</p>
                </button>
                <p className="lineproduct-card__count-card__text">{product.count}</p>
                <button className="lineproduct-card__count-card__minusButton">
                    <p className="lineproduct-card__count-card__minusText">+</p>
                </button>
            </div>
            <p className="lineproduct-card__count-card__priceText">${price}</p>
            <button className="lineproduct-card__count-card__deleteButton">
                <p className="lineproduct-card__count-card__deleteButton__text">×</p>
            </button>
        </div>
    </div>
    </div>
    </>
  );
}
