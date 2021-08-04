import {
    GET_ORDER,
    PLACE_ORDER,
    SUCCESS_ORDER,
    FAIL_ORDER,
    LOADING_ORDER,
  } from './types';
      
    const initialState = {
     order:{},
     title:'',
     deliveryInfos:[],
     loading:false,
     successOrder:false,
     failOrder:false
    };
      
      export default function(state = initialState, action) {
        switch (action.type) {
          case LOADING_ORDER:
            return{
              ...state,
              loading: true
            };
          case GET_ORDER:
            return{
              ...state,
              order: action.payload,
              title: action.payload.productTitle,
              deliveryInfos: action.payload.deliveryInfos,
              loading: false
            };
            case SUCCESS_ORDER:
            return{
              ...state,
              successOrder: true
            };
            case FAIL_ORDER:
            return{
              ...state,
              failOrder: true
            };
          default:
            return state;
        }
      }
