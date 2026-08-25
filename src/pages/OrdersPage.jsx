import '../styles/checkout.css'
import { useState, useEffect, useReducer, useContext } from "react";
import Navbar from "../components/Navbar";
import OrderList from '../components/OrderList';
import { OrderCtx } from '../context/OrderContext';

export default function OrdersPage() {

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
    <Navbar/>
    <div className={((order || [])).length > 0 ? "orders-page" : "orders-page--empty"}>
      {((order || [])).length > 0 ?
        <>
          <OrderList/>
        </>
        :
        <div className='checkout-page__emptyCart'>
          <div className='checkout-page__emptyCart__textDiv'>
            <p className='checkout-page__emptyCart__mainText'>No orders yet</p>
            <p className='checkout-page__emptyCart__subText'>Orders you place will show up here</p>
          </div>
          <button className='checkout-page__emptyCart__button'>
            <p className='checkout-page__emptyCart__button__text' onClick={() => {navigate("/")}}>Browse the store</p>
          </button>
        </div>
      }
    </div>
    </>
  );
}