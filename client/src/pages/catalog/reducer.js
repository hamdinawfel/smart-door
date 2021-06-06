import {
  LOADING_CATEGORIES,
  GET_CATEGORIES,
  LOADING_PRODUCTS,
  GET_SHOWCASE,
  GET_BY_CATEGORY,
  GET_BY_SUB_CATEGORY,
  SET_ERROR
} from './types';
    
  const initialState = {
    //CATEGORY 
    loadingCategories: false,
    categories: [],
    //PRODUCTS
    loadingProducts: false,
    products: [],
    //ERROR
    error:false
  };
    
    export default function(state = initialState, action) {
      switch (action.type) {
        //CATEGORY SETUP
        case LOADING_CATEGORIES:
          return {
            ...state,
            loadingCategories: true
          };
        case GET_CATEGORIES:
          return{
            ...state,
            categories: action.payload,
            loadingCategories: false
          };
          //PRODUCTS SETUP
          case LOADING_PRODUCTS:
            return {
              ...state,
              loadingProducts: true
            };
          //showrrom SETUP
          case GET_SHOWCASE:
            return{
              ...state,
              products: action.payload,
              loadingProducts: false
            };
          case GET_BY_CATEGORY:
            return{
              ...state,
              products: action.payload,
              loadingProducts: false
            };
          case GET_BY_SUB_CATEGORY:
            return{
              ...state,
              products: action.payload,
              loadingProducts: false
            };
          // ERROR
          case SET_ERROR:
            return {
              ...state,
              error: true
            };
        default:
          return state;
      }
    }