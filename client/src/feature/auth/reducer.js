import {
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING,
    GET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    GET_ACTIVATE_EMAIL,
    GET_FORGOT_PWD_TOKEN,
    SEND_NEW_PASSWORD,
    RESET_PWD_SUCCESS
  } from './types';
  
  const initialState = {
    authenticated: false,
    loading: false,
    activatedStep:false,
    showForgotPwdMsg : false,
    resetPwdSuccess:false,
    user:{},
    errors:{},
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_AUTHENTICATED:
        return {
          ...state,
          authenticated: true,
          loading: false
        };
      case SET_UNAUTHENTICATED:
        return initialState;
      case GET_USER:
        return {
          ...state,
          user:action.payload.user,
          loading: false,
          
        };
      case LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_ACTIVATE_EMAIL:
        return {
          ...state,
          activatedStep: true,
          loading: false
        };
      case GET_FORGOT_PWD_TOKEN:
        return {
          ...state,
          showForgotPwdMsg: true,
          loading: false
        };
      case SEND_NEW_PASSWORD:
        return {
          ...state,
          loading: true
        };
      case RESET_PWD_SUCCESS:
        return {
          ...state,
          resetPwdSuccess:true,
          loading: false
        };
        case SET_ERRORS:
        return {
          ...state,
          loading: false,
          activatedStep:false,
          showForgotPwdMsg : false,
          errors: action.payload
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          errors: {}
        };
      default:
        return state;
    }
  }