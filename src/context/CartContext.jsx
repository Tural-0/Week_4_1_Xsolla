import { createContext, useReducer } from "react";
import { PRODUCTS } from "../data/products";

export const CartCtx = createContext(null);

export function CartProvider({ children }) {

    function itemsReducer(products, action) {
        switch (action.type) {
          case 'ADD':
            const id = (products[products.length - 1].id ?? 0) + 1;

            const product = {
              id,
              name: action.name,
              price: parseInt(action.price),
              quantity: 0,
              imageUrl: action.img
            };

            return [...products, product];
          case 'INCREASE':
            return products.map(product =>
              product.id === action.id
                ? { ...product, quantity: product.quantity + 1 }
                : product
            )
          case 'DECREASE':
            return products.map(product =>
              product.id === action.id
                ? { ...product, quantity: product.quantity - 1 }
                : product
            )
        }
    }

    const [products, dispatch] = useReducer(itemsReducer, PRODUCTS);

    return (
        <CartCtx.Provider value={{ products, dispatch }}>
            {children}
        </CartCtx.Provider>
    );
}