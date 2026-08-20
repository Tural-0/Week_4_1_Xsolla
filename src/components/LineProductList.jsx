import { useState } from "react";
import LineProduct from "./LineProduct";
import { Link } from "react-router-dom";
import '../styles/lineproductlist.css';
import { CART } from "../data/cart"

export default function LineProductList() {

  const [cart, setCart] = useState(CART)

  const totalPrice = cart.reduce(
    (total, product) => (total + product.price * product.quantity)/100,
    0
  );

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
