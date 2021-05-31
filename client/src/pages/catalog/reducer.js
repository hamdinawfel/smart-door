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
    
  const initialState = {
    //CATEGORY 
    loadingCategories: false,
    categories: [],
    //SUBCATEGORY 
    loadingSubCategories: false,
    subCategories: [],
    //PRODUCTS
    loadingProducts: false,
    products: [],
    //SEARCH
    loadingSearch: false,
    searchData: [],
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
          //SUBCATEGORY SETUP
          case LOADING_SUBCATEGORIES:
            return {
              ...state,
              loadingSubCategories: true
            };
          case GET_SUBCATEGORIES:
            return{
              ...state,
              categoriesData: action.payload,
              subCategories: false
            };
          //PRODUCTS SETUP
          case LOADING_PRODUCTS:
            return {
              ...state,
              loadingProducts: true
            };
          case GET_PRODUCTS:
            return{
              ...state,
              products: action.payload,
              loadingProducts: false
            };
          //FILTER SETUP
          case GET_CATALOG:
            return{
              ...state,
              products: action.payload,
              loadingProducts: false
            };
              //SEARCH SETUP
          case LOADING_SEARCH:
            return {
              ...state,
              loadingSearch: true
            };
          case GET_SEARCH:
            return{
              ...state,
              searchData: action.payload,
              loadingSearch: false
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