import { useState, useContext, useEffect } from "react";
import LineProduct from "./LineProduct";
import { CartCtx } from "../context/CartContext";
import '../styles/lineproductlist.css';

export default function LineProductList() {

  const {
    cart,
    loadCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    delItemFromCart
  } = useContext(CartCtx)

  useEffect(() => {
    loadCart()
  },[])

  return (
    <>
    <div className="line-product-list">
        <p className="line-product-list__countText">Your cart · {cart.length} items</p>
        <div className="line-product-list__list">
            {cart.length > 0 && cart.map((product) => (
                <LineProduct
                    key={product.id}
                    product={product}
                    onIncrease={() => increaseItemQuantity(product.id)}
                    onDecrease={() => decreaseItemQuantity(product.id)}
                    onDelete={() => delItemFromCart(product.id)}
                />
            ))}
        </div>
    </div>
    </>
  );
}
