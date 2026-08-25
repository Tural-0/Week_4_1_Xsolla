import { createContext, useReducer } from "react";
import { placeUserOrder, getUserOrders } from "../api/orderApi";
import { getItemById } from "../api/itemsApi";

export const OrderCtx = createContext(null);

async function addName(orders){
    return await Promise.all(
        orders.map(async order => ({
            ...order,
            line_items: await Promise.all(
                order.line_items.map(async line_item => {
                    const item = await getItemById(line_item.item_id);

                    return {
                        ...line_item,
                        name: item.name
                    };
                })
            )
        }))
    );
}

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

    async function getOrders() {
        dispatch({ type: "FETCH_START" });

        try{
            const data = await getUserOrders();

            const arr = JSON.parse(JSON.stringify(data))
            const orders = await addName(arr);
            const final = orders.sort((a,b) => {
                if (a.id > b.id) return -1
                else return 1
            })

            dispatch({
                type: "FETCH_SUCCESS",
                order: final
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
                getOrders,
                dispatch
            }}>
            {children}
        </OrderCtx.Provider>
    );
}