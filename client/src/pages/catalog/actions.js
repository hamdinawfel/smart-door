import {
  LOADING_CATEGORIES,
  GET_CATEGORIES,
  LOADING_SUBCATEGORIES,
  GET_SUBCATEGORIES,
  LOADING_PRODUCTS,
  GET_PRODUCTS,
  GET_CATALOG,
  LOADING_SEARCH,
  GET_SEARCH,
  SET_ERROR
    } from './types';
import axios from 'axios';
  
// CATEGORY MANAGEMENT
export const getCategories = () => (dispatch) => {
  dispatch({ type: LOADING_CATEGORIES });
    axios
    .get('/category')
      .then((res) => {
        dispatch({
          type: GET_CATEGORIES,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({ type: SET_ERROR  });
  });
}
 
// SUBCATEGORY MANAGEMENT
export const getSubCategories = () => (dispatch) => {
  dispatch({ type: LOADING_SUBCATEGORIES });
    axios
    .get('/subcategory')
      .then((res) => {
        dispatch({
          type: GET_SUBCATEGORIES,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({ type: SET_ERROR  });
  });
}
    
// PRODUCTS MANAGEMENT
export const getProducts = () => (dispatch) => {
  dispatch({ type: LOADING_PRODUCTS });
    axios
    .get('/products')
      .then((res) => {
        dispatch({
          type: GET_PRODUCTS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({ type: SET_ERROR  });
  });
}
// FILTER MANAGEMENT
export const getCatalog = (tag) => (dispatch) => {
  dispatch({ type: LOADING_PRODUCTS });
    axios
    .get(`/catalog?tag=${tag}`)
      .then((res) => {
        dispatch({
          type: GET_CATALOG,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({ type: SET_ERROR  });
  });
}
//SEARCH
export const search = (searchText) => (dispatch) => {
  dispatch({ type: LOADING_SEARCH });
    axios
    .get(`catalog/search?keyword=${searchText}`)
      .then((res) => {
        dispatch({
          type: GET_SEARCH,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({ type: SET_ERROR  });
  });
}
