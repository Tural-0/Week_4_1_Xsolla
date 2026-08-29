import { act, createContext, useReducer } from "react";
import { getItemQuantity, getItems } from "../api/itemsApi";
import { useEffect } from "react";
import { changeItemQuantity } from "../api/cartApi";

export const PrdctCtx = createContext(null);

async function addQuantity(products){
    return await Promise.all(
        products.map(async product => { 
            return {
            ...product,
            quantity: await getItemQuantity(product.id)
        }})
    );
}

export function ProductProvider({ children }) {

    const initialState = {
        status: "idle",
        products: [],
        error: null
    };

    const [state, dispatch] = useReducer(itemsReducer, initialState);

    async function loadProducts() {
        dispatch({ type: "FETCH_START" });

        try {
            const data = await getItems();

            const arr = JSON.parse(JSON.stringify(data))
            const prdcs = await addQuantity(arr.data);

            dispatch({
                type: "FETCH_SUCCESS",
                products: prdcs
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
        const item = state.products.find(p => p.id === itemId);

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
        const item = state.products.find(p => p.id === itemId);

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

    useEffect(() => {
        loadProducts();
    }, []);
  
    function itemsReducer(state, action) {
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
                    products: action.products,
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
                    products: state.products.map(product =>
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
                    products: state.products.map(product =>
                        product.id === action.id
                            ? {
                                ...product,
                                quantity: product.quantity - 1
                            }
                            : product
                    )
                };
            default:
                return state;
        }
    }


    return (
        <PrdctCtx.Provider
            value={{
                products: state.products,
                status: state.status,
                error: state.error,
                increaseItemQuantity,
                decreaseItemQuantity,
                loadProducts,
                dispatch
            }}>
            {children}
        </PrdctCtx.Provider>
    );
}