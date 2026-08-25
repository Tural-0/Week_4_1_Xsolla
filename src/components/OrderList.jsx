import { useState, useContext, useEffect } from "react";
import { OrderCtx } from "../context/OrderContext";
import Order from "./Order";
import "../styles/orderlist.css"

export default function OrderList() {

    const {
      order,
      getOrders,
      status,
    } = useContext(OrderCtx)
  
    useEffect(() => {
      getOrders()
    }, []);

  return (
    <>
    <div className="order-list">
        <p className="order-list__title">Your orders</p>
        <div className="order-list__list">
            {order.length > 0 && order.map((o) => {
              if(o.line_items.length > 0){
                return(
                <Order
                  key={o.id}
                  order={o}
                />)
              }
            }
            )}
        </div>
    </div>
    </>
  );
}
