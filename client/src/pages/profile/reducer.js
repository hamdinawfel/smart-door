import {
    SHOW_SUCCESS_PROFILE_UPDATE,
    CLOSE_SUCCESS_PROFILE_MESSAGE,
  
    SHOW_SUCCESS_PASSWORD_UPDATE,
    CLOSE_SUCCESS_PASSWORD_MESSAGE,
  
    LOADING_ORDERS_COUNT,
    GET_ORDERS_COUNT,
  
    LOADING_ORDERS,
    GET_ORDERS
    } from './types';
        
      const initialState = {
        success : false,
        successPwdChange : false,
        loadingOrders:false,
        orders:[],
        loadingCount: false,
        count:''
      };
        
        export default function(state = initialState, action) {
          switch (action.type) {
            case SHOW_SUCCESS_PROFILE_UPDATE:
              return {
                ...state,
                success: true
              };
            case CLOSE_SUCCESS_PROFILE_MESSAGE:
              return {
                ...state,
                success: false
              };
            case SHOW_SUCCESS_PASSWORD_UPDATE:
              return {
                ...state,
                successPwdChange: true
              };
            case CLOSE_SUCCESS_PASSWORD_MESSAGE:
              return {
                ...state,
                successPwdChange: false
              };
            case LOADING_ORDERS_COUNT:
              return {
                ...state,
                loadingCount: true
              };
            case GET_ORDERS_COUNT:
              return {
                ...state,
                count:action.payload,
                loadingCount: false
              };
            case LOADING_ORDERS:
              return {
                ...state,
                loadingOrders: true
              };
            case GET_ORDERS:
              return {
                ...state,
                orders:action.payload,
                loadingOrders: false
              };
            default:
              return state;
          }
        }