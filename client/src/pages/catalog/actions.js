import {
  LOADING_CATEGORIES,
  GET_CATEGORIES,
  LOADING_PRODUCTS,
  GET_SHOWCASE,
  GET_BY_CATEGORY,
  GET_BY_SUB_CATEGORY,
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
//showroom setup
export const getShowcaseProducts = (sort,limit) => (dispatch) => {
  dispatch({ type: LOADING_PRODUCTS });
    axios
    .get(`/catalog/showcase?sort=${sort}&limit=${limit}`)
      .then((res) => {
        dispatch({
          type: GET_SHOWCASE,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({ type: SET_ERROR  });
  });
}
//GET BY CATEGORY
export const getByCategory = (category) => (dispatch) => {
  dispatch({ type: LOADING_PRODUCTS });
    axios
    .get(`/catalog/category/${category}`)
      .then((res) => {
        dispatch({
          type:   GET_BY_CATEGORY,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({ type: SET_ERROR  });
  });
}
//GET BY SUBCATEGORY
export const getBySubCategory = (subCategory) => (dispatch) => {
  dispatch({ type: LOADING_PRODUCTS });
    axios
    .get(`/catalog/subcategory/${subCategory}`)
      .then((res) => {
        dispatch({
          type:   GET_BY_SUB_CATEGORY,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({ type: SET_ERROR  });
  });
}
