import {
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING,
    GET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    SHOW_ACTIVATE_MESSAGE,
    SHOW_RESET_PWD_MESSAGE,
  } from './types';
  
  const initialState = {
    authenticated: false,
    loading: false,
    showActivateMsg:false,
    showResetPwdMsg:false,
    user:{},
    errors:{},
    redirectPath:'/'
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
      case SHOW_ACTIVATE_MESSAGE:
        return {
          ...state,
          showActivateMsg: true,
          loading: false
        };
      case SHOW_RESET_PWD_MESSAGE:
        return {
          ...state,
          showResetPwdMsg: true,
          loading: false
        };
        case SET_ERRORS:
        return {
          ...state,
          loading: false,
          showActivateMsg:false,
          showResetPwdMsg : false,
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