import {
    SECCESS_SUBMIT,
    LOADING,
    SET_ERROR,
    GET_LOCATIONS,
    LOADING_LOCATIONS
    } from './types';
    import axios from 'axios';
  
    export const submitCart = (orderData) => (dispatch) => {
      dispatch({ type: LOADING});
        axios
        .post('/orders', orderData)
          .then((res) => {
            if(res.status === 200 ){
              dispatch({ type: SECCESS_SUBMIT});
            }
            })
          .catch((err) => {
            dispatch({
              type: SET_ERROR,
            });
          });
      };
    export const getLocations = () => (dispatch) => {
      dispatch({ type: LOADING_LOCATIONS });
        axios
        .get('/locations')
        .then((res) => {
          dispatch({
            type: GET_LOCATIONS,
            payload: res.data
          });
        })
          .catch((err) => {
            dispatch({
              type: SET_ERROR,
            });
          });
      };