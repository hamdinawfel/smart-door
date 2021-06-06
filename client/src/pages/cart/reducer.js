import {
    ADD_TO_CART,
    SUB_QUANTITY,
    REMOVE_ITEM,
    GET_CART,
    SET_ERROR,
  
    } from './types';
    
    const initialState = {
      addedItems: [],
      total: 0,
      count: 0,
      error:false
    };
    
    export default function(state = initialState, action) {
      switch (action.type) {
        case ADD_TO_CART:
          let addedItems = JSON.parse(localStorage.getItem("addedItems"));
          let total = parseInt(localStorage.getItem("total"));
          if(addedItems){
            let existedItem = addedItems.find(item => item._id ===  action.payload._id)
            if(existedItem){
              let purchaseItem = action.payload
              purchaseItem.quantity = purchaseItem.quantity +1 ;
              existedItem.quantity = existedItem.quantity +1;
              total = total + existedItem.price;
              localStorage.setItem('addedItems', JSON.stringify(addedItems));
              localStorage.setItem('total', total);
              return{
                ...state,
                addedItems : addedItems,
                total: total,
                  }
            }else{
              let purchaseItem = action.payload
              purchaseItem.quantity = 1;
              total = total + purchaseItem.price;
              addedItems.push(action.payload)
              localStorage.setItem('addedItems', JSON.stringify(addedItems));
              localStorage.setItem('total', total);
              return{
                ...state,
                addedItems : addedItems,
                total: total,
               }
            }
          }else{
            let addedItems = [];
            let total = 0;
            let purchaseItem = action.payload
            purchaseItem.quantity = 1;
            total = purchaseItem.price
            addedItems.push(purchaseItem)
            localStorage.setItem('addedItems', JSON.stringify(addedItems));
            localStorage.setItem('total', total);
            return{
                ...state,
                addedItems : addedItems,
                total: total,
                }
          }
          case SUB_QUANTITY:
            let subItems = JSON.parse(localStorage.getItem("addedItems"));
            let newTotal = parseInt(localStorage.getItem("total"));
            let subItem = subItems.find(item=> item._id === action.payload._id)
            if(subItem.quantity > 0 ){
              subItem.quantity = subItem.quantity -1;
              subItems = subItems.filter(item => item._id !== action.payload._id);
              subItems.push(subItem)
                newTotal = newTotal - subItem.price;
                localStorage.setItem('addedItems', JSON.stringify(subItems));
               localStorage.setItem('total', newTotal);
                return{
                ...state,
                addedItems : subItems,
                total: newTotal,
              }
            }else {
              console.log(subItem.quantity)
              action.payload.quantity = 0;
              subItems = subItems.filter(item => item._id !== action.payload._id);
              localStorage.setItem('addedItems', JSON.stringify(subItems));
              return{
                ...state,
                addedItems : subItems,
              }
            };
      case REMOVE_ITEM:
        // let removed = state.addedItems.find(item => item._id === action.payload);
        // let newTotal = state.total - removed.sellPrice*removed.quantity;
        // let newCount = state.count - removed.quantity
        // removed.quantity = 0
        // return{
        //   ...state,
        //   addedItems: state.addedItems.filter(item => item._id !== action.payload),
        //   total: newTotal,
        //   count : newCount
        // };
            // ERROR
          case GET_CART:
            let inCartItems = JSON.parse(localStorage.getItem("addedItems"));
            let cartTotal = parseInt(localStorage.getItem("total"));
            return {
              ...state,
              addedItems:inCartItems !== null?inCartItems:[],
               total:cartTotal !== NaN?cartTotal:0
            };
          case SET_ERROR:
            return {
              ...state,
              error: true
            };
        default:
          return state;
      }
    }