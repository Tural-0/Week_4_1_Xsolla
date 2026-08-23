import { createContext, useReducer } from "react";
import { useEffect } from "react";
import { changeItemQuantity, getUserCart, deleteItemFromCart, deleteUserCart } from "../api/cartApi";

export const CartCtx = createContext(null);

export function CartProvider({ children }) {

    const initialState = {
        status: "idle",
        products: [],
        error: null
    };

    const [state, dispatch] = useReducer(cartReducer, initialState);

    async function loadCart(){
        dispatch({ type: "FETCH_START" });

        try {
            const data = await getUserCart();

            dispatch({
                type: "FETCH_SUCCESS",
                cart: data.items
            });

        } catch (error) {
            console.error(error);

            dispatch({
                type: "FETCH_ERROR",
                error: error.message
            });
        }
    }

    async function increaseItemQuantity(itemId){
        const item = state.cart.find(p => p.id === itemId);

        if (!item) {
            return;
        }

        try{
            await changeItemQuantity(itemId, item.quantity+1);

            dispatch({
                type: "INCREASE",
                id: itemId
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function decreaseItemQuantity(itemId){
        const item = state.cart.find(p => p.id === itemId);

        if (!item) {
            return;
        }

        try{
            await changeItemQuantity(itemId, item.quantity-1);

            dispatch({
                type: "DECREASE",
                id: itemId
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function delItemFromCart(itemId){
        try{
            await deleteItemFromCart(itemId);

            dispatch({
                type: "DELETE",
                id: itemId
            })
        } catch (error) {
            console.error(error);
        }
    }

    async function delUserCart(){
        try{
            await deleteUserCart();

            dispatch({
                type: "DELETE_CART"
            })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadCart();
    }, []);
  
    function cartReducer(state, action) {
        switch (action.type) {
            case "FETCH_START":
                return {
                    ...state,
                    status: "loading",
                    error: null
                };
            case "FETCH_SUCCESS":
                return {
                    status: "success",
                    cart: action.cart,
                    error: null
                };
            case "FETCH_ERROR":
                return {
                    ...state,
                    status: "error",
                    error: action.error
                };
            case 'INCREASE':
                return {
                    ...state,
                    cart: state.cart.map(product =>
                        product.id === action.id
                            ? {
                                ...product,
                                quantity: product.quantity + 1
                            }
                            : product
                        )
                };
            case 'DECREASE':
                return {
                    ...state,
                    cart: state.cart.map(product =>
                        product.id === action.id
                            ? {
                                ...product,
                                quantity: product.quantity - 1
                            }
                            : product
                    )
                };
            case 'DELETE':
                return {
                    ...state,
                    cart: state.cart.filter(
                        product => product.id !== action.id
                    )
                };
            case 'DELETE_CART':
                return {
                    ...state,
                    cart: []
                };
            default:
                return state;
        }
    }


    return (
        <CartCtx.Provider
            value={{
                cart: state.cart,
                status: state.status,
                error: state.error,
                increaseItemQuantity,
                decreaseItemQuantity,
                delItemFromCart,
                delUserCart,
                loadCart,
                dispatch
            }}>
            {children}
        </CartCtx.Provider>
    );
}