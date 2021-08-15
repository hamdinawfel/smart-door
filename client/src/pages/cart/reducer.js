import {
    ADD_TO_CART,
    SUB_QUANTITY,
    GET_CART,
  
    } from './types';
    
    const initialState = {
      addedItems: [],
      total: 0,
      count: 0,
    };
    
    export default function(state = initialState, action) {
      switch (action.type) {
        case ADD_TO_CART:
          let addedItems = JSON.parse(localStorage.getItem("addedItems"));
          let total = parseInt(localStorage.getItem("total"));
          let count = parseInt(localStorage.getItem("count"));
          if(addedItems){
            let existedItem = addedItems.find(item => item._id ===  action.payload._id)
            if(existedItem){
              let purchaseItem = action.payload
              purchaseItem.quantity = purchaseItem.quantity +1 ;
              existedItem.quantity = existedItem.quantity +1;
              total = total + existedItem.price;
              count = count + 1;
              localStorage.setItem('addedItems', JSON.stringify(addedItems));
              localStorage.setItem('total', total);
              localStorage.setItem('count', count);
              return{
                ...state,
                addedItems : addedItems,
                total: total,
                count: count
                  }
            }else{
              let purchaseItem = action.payload
              purchaseItem.quantity = 1;
              total = total + purchaseItem.price;
              count = count + 1;
              addedItems.push(action.payload)
              localStorage.setItem('addedItems', JSON.stringify(addedItems));
              localStorage.setItem('total', total);
              localStorage.setItem('count', count);
              return{
                ...state,
                addedItems : addedItems,
                total: total,
                count: count
               }
            }
          }else{
            let addedItems = [];
            let total = 0;
            let count = 0;
            let purchaseItem = action.payload
            purchaseItem.quantity = 1;
            total = purchaseItem.price;
            count = 1;
            addedItems.push(purchaseItem)
            localStorage.setItem('addedItems', JSON.stringify(addedItems));
            localStorage.setItem('total', total);
            localStorage.setItem('count', count);
            return{
                ...state,
                addedItems : addedItems,
                total: total,
                count: count
                }
          }
          case SUB_QUANTITY:
            let subItems = JSON.parse(localStorage.getItem("addedItems"));
            let newTotal = parseInt(localStorage.getItem("total"));
            let newCount = parseInt(localStorage.getItem("count"));
            let subItem = subItems.find(item=> item._id === action.payload._id)
            if(subItem.quantity > 0 ){
              subItem.quantity = subItem.quantity -1;
              subItems = subItems.filter(item => item._id !== action.payload._id);
              subItems.push(subItem)
                newTotal = newTotal - subItem.price;
                newCount = newCount - 1;
                localStorage.setItem('addedItems', JSON.stringify(subItems));
               localStorage.setItem('total', newTotal);
               localStorage.setItem('count', newCount);
                return{
                ...state,
                addedItems : subItems,
                total: newTotal,
                count: newCount

              }
            }else {
              console.log(subItem.quantity)
              action.payload.quantity = 0;
              subItems = subItems.filter(item => item._id !== action.payload._id);
              localStorage.setItem('addedItems', JSON.stringify(subItems));
              return{
                ...state,
                addedItems : subItems,
                // count: 0
              }
            };
            // ERROR
          case GET_CART:
            let inCartItems = JSON.parse(localStorage.getItem("addedItems"));
            let cartTotal = parseInt(localStorage.getItem("total"));
            let cartCount = parseInt(localStorage.getItem("count"));
            return {
              ...state,
              addedItems:inCartItems !== null?inCartItems:[],
               total:cartTotal !== NaN?cartTotal:0,
               count: cartCount ?  cartCount:0
            };
        default:
          return state;
      }
    }