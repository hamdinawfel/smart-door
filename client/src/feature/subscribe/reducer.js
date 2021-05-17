import {
    LOADING,
    SUCCESS_SUBSCRIBE,
    SET_ERROR,
    CLOSE_MESSAGE
  } from './types';
  
  const initialState = {
    loading: false,
    success : false,
    error: false,
    
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            };
        case SUCCESS_SUBSCRIBE:
            return {
                ...state,
                success: true,
                loading: false
            };
        case SET_ERROR:
            return {
                ...state,
                error:true,
                loading: false,
            };
        case CLOSE_MESSAGE:
            return {
                ...state,
                error:false,
                success: false,
            };
        default:
            return state;
    }
  }