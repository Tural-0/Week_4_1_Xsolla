import { createContext, useReducer } from "react";
import { placeUserOrder } from "../api/orderApi";

export const OrderCtx = createContext(null);

export function OrderProvider({ children }) {

    const initialState = {
        status: "idle",
        order: null,
        error: null
    };

    const [state, dispatch] = useReducer(orderReducer, initialState);

    async function placeOrder(items,total) {
        dispatch({ type: "FETCH_START" });

        try{
            const data = await placeUserOrder(items, total);
            const orderData = data.order;

            dispatch({
                type: "FETCH_SUCCESS",
                order: orderData
            });
        } catch (error) {
            console.error(error);

            dispatch({
                type: "FETCH_ERROR",
                error: error.message
            });
        }
    }
  
    function orderReducer(state, action) {
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
                    order: action.order,
                    error: null
                };
            case "FETCH_ERROR":
                return {
                    ...state,
                    status: "error",
                    error: action.error
                };
            default:
                return state;
        }
    }


    return (
        <OrderCtx.Provider
            value={{
                order: state.order,
                status: state.status,
                error: state.error,
                placeOrder,
                dispatch
            }}>
            {children}
        </OrderCtx.Provider>
    );
}