import {
    SECCESS_SUBMIT,
    SET_ERROR,
    LOADING,
    GET_LOCATIONS,
    LOADING_LOCATIONS

    } from './types';
    
    const initialState = {
      loading: false,
      error: false,
      success : false,
      locations : [],
      loadingLocations: false
    };
    
    export default function(state = initialState, action) {
      switch (action.type) {
        case LOADING:
          return {
            ...state,
            loading: true
          };
        case SECCESS_SUBMIT:
          return {
            ...state,
            success: true,
            loading: false,
          };
        case SET_ERROR:
          return {
            ...state,
            error: true,
            loading: false,
          };
        case LOADING_LOCATIONS:
          return {
            ...state,
            loadingLocation: true,
          };
        case GET_LOCATIONS:
          return {
            ...state,
            locations: action.payload,
            loadingLocations: false,
          };
        
        default:
          return state;
      }
    }