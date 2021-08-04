import {
    GET_ORDER,
    PLACE_ORDER,
    CREATE_ORDER,
    SUCCESS_ORDER,
    FAIL_ORDER,
    LOADING_ORDER,
    ADD_QANTITY,
    SUB_QUANTITY
   } from './types';
  import axios from 'axios';
  
  export const getOrder = ()=> {
    let order = JSON.parse(localStorage.getItem("newOrder"));
    return{
      type: GET_ORDER,
      payload: order
    }
  }

  export const createOrder = (orderData) => {
    localStorage.setItem('newOrder', JSON.stringify(orderData));
    return{
      type: CREATE_ORDER,
    }
  }

  export const addQauntity = () => dispatch => {
     let order = JSON.parse(localStorage.getItem("newOrder"));
     const quantity = order.quantity+1;
    localStorage.setItem('newOrder', JSON.stringify({...order, quantity}));
    dispatch(getOrder());
    return{
      type: ADD_QANTITY,
    }
  }
    // SUB QUANTITY
  export const subQuantity = ()  => dispatch =>{
    let order = JSON.parse(localStorage.getItem("newOrder"));
    const quantity = order.quantity-1;
    localStorage.setItem('newOrder', JSON.stringify({...order, quantity}));
    dispatch(getOrder());
    return{
      type: SUB_QUANTITY,
     
    }
  }