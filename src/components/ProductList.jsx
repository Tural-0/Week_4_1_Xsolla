import { useState, useReducer, useContext, useEffect } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import '../styles/productlist.css';
import { PrdctCtx } from "../context/ProductContext";
import ProductListLoading from "./ProductListLoading";

export default function ProductList() {

  const {
    products,
    status,
    error,
    loadProducts,
    increaseItemQuantity,
    decreaseItemQuantity
  } = useContext(PrdctCtx);

  useEffect(() => {
    loadProducts()
  },[])
  

  return (
    <>
    <div className="product-list">
      {status === "success"
      ?
        products.length > 0 && products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onIncrease={() => increaseItemQuantity(product.id)}
            onDecrease={() => decreaseItemQuantity(product.id)}
          />
        ))
        :
        <ProductListLoading/>
      }
    </div>
    </>
  );
}
