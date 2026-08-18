import { useState, useReducer, useContext } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import '../styles/productlist.css';
import { CartCtx } from "../context/CartContext";

export default function ProductList() {

  const {products, dispatch} = useContext(CartCtx)

  const totalPrice = products.reduce(
    (total, product) => (total + product.price * product.quantity)/100,
    0
  );

  return (
    <>
    <div className="product-list">
      {products.length > 0 &&
        products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onIncrease={() => dispatch({type:"INCREASE", id: product.id})}
            onDecrease={() => dispatch({type:"DECREASE", id: product.id})}
            isInCart={false}
          />
        ))}
    </div>
    </>
  );
}
