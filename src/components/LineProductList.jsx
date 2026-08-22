import { useState, useContext, useEffect } from "react";
import LineProduct from "./LineProduct";
import { CartCtx } from "../context/CartContext";
import '../styles/lineproductlist.css';

export default function LineProductList() {

  const {products, dispatch} = useContext(CartCtx)
  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(products.filter(product => product.quantity > 0))
  },[cart]);

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
