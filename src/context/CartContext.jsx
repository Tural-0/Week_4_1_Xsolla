import { createContext, useReducer } from "react";
import { useEffect } from "react";
import { changeItemQuantity, getUserCart, deleteItemFromCart } from "../api/cartApi";

export const CartCtx = createContext(null);

export function CartProvider({ children }) {

    const [cart, dispatch] = useReducer(cartReducer, []);

    async function updateItemQuantity(itemId, quantity){
        try{
            await changeItemQuantity(itemId, quantity);
        } catch (error) {
            console.error(error);
        }
    }

    async function loadCart(){
        try {
            const data = await getUserCart();

            dispatch({
                type: "SET_CART",
                cart: data.items
            });

        } catch (error) {
            console.error(error);
        }
    }

    async function delItemFromCart(itemId){
        try{
            await deleteItemFromCart(itemId);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadCart();
    }, []);
  
    function cartReducer(cart, action) {
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
                const itemInc = cart.find(p => p.id === action.id);
                updateItemQuantity(itemInc.id, itemInc.quantity + 1);
                //loadCart();
                return cart.map(product =>
                    product.id === action.id
                        ? {
                            ...product,
                            quantity: product.quantity + 1
                        }
                        : product
                );
            case 'DECREASE':
                const itemDec = cart.find(p => p.id === action.id);
                updateItemQuantity(itemDec.id, itemDec.quantity - 1);
                //loadCart();
                return cart.map(product =>
                    product.id === action.id
                        ? {
                            ...product,
                            quantity: product.quantity - 1
                        }
                        : product
                );
            case 'DELETE':
                const itemDel = cart.find(p => p.id === action.id);
                delItemFromCart(itemDel.id);
                loadCart();
                return cart;
            case "SET_CART":
                return action.cart;
            case "LOAD":
                loadCart();
                return cart;
        }
    }


    return (
        <CartCtx.Provider value={{ cart, dispatch }}>
            {children}
        </CartCtx.Provider>
    );
}