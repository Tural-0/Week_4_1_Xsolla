import { useState, useContext, useEffect } from "react";
import LineProduct from "./LineProduct";
import { CartCtx } from "../context/CartContext";
import '../styles/lineproductlist.css';

export default function LineProductList() {

  const {cart, dispatch} = useContext(CartCtx)

  return (
    <>
    <div className="line-product-list">
        <p className="line-product-list__countText">Your cart · {cart.length} items</p>
        <div className="line-product-list__list">
            {cart.length > 0 && cart.map((product) => (
                <LineProduct
                    key={product.id}
                    product={product}
                    onIncrease={() => dispatch({type:"INCREASE", id: product.id})}
                    onDecrease={() => dispatch({type:"DECREASE", id: product.id})}
                    isInCart={true}
                />
            ))}
        </div>
    </div>
    </>
  );
}
