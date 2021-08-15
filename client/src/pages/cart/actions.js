import {
    ADD_TO_CART,
    SUB_QUANTITY,
    REMOVE_ITEM,
    CLEAR_ALL,
    GET_CART,
    } from './types';
     
      // ADD TO CART
export const addToCart = (purchaseItem) =>{
  return{
    type: ADD_TO_CART,
    payload: purchaseItem
  }
}
  // SUB QUANTITY
export const subQuantity = (purchaseItem) =>{
  return{
    type: SUB_QUANTITY,
    payload: purchaseItem
  }
}
// REMOVE ITEM
export const removeItem = (id) =>{
  return{
    type: REMOVE_ITEM,
    payload: id
  }
}
// Clear all
export const clearAll = () =>{
  return{
    type: CLEAR_ALL,
  }
}
// GET ITEM IN CART
export const getCart = () =>{
  return{
    type: GET_CART,
  }
}
