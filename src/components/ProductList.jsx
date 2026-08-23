import { useState, useReducer, useContext } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import '../styles/productlist.css';
import { PrdctCtx } from "../context/ProductContext";

export default function ProductList() {

  const {products, dispatch} = useContext(PrdctCtx)

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
