import {
    LOADING,
    SUCCESS_SUBSCRIBE,
    SET_ERROR,
    CLOSE_MESSAGE,
  } from './types';
  import axios from 'axios';
  
  export const subscribe = (email) => (dispatch) => {
    dispatch({ type: LOADING })
    axios
      .post("/subscribe", email)
      .then(res => { 
        dispatch({ type: SUCCESS_SUBSCRIBE })
      })
      .catch(err =>
        dispatch({ type: SET_ERROR })
      );
  };
  export const closeMessage = () => (dispatch) => {
    dispatch({ type: CLOSE_MESSAGE })
  };
  