import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
import { useSelector } from "react-redux";


export const fetchOrders =  () => {
    return async dispatch => {
    
    const response = await fetch('https://shop-8fe7c-default-rtdb.firebaseio.com/orders/u1.json');

    const resData = await response.json();
    const loadedOrders = [];

    for( const key in resData) {
      loadedOrders.push(
        new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
        )
          );
        dispatch({ type: SET_ORDERS, orders: loadedOrders});
        }
    }
}

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
      const userId = getState().auth.userId;
    const userToken = getState().auth.token;
      const date = new Date();
      const response = await fetch(`https://shop-8fe7c-default-rtdb.firebaseio.com/tickets/${userId}/orders.json?auth=${userToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: new Date().toISOString()
      })
    });

    const resData = await response.json();
        dispatch ({
            type: ADD_ORDER, 
            orderData: {id: resData.name, items: cartItems, amount: totalAmount, date: date}
        })
    }

}