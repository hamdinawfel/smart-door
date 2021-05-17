import {
    LOADING,
    GET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    REDIRECT_USER_TO_AUTH,
    ADD_USER_DETAILS,
    SEND_ACTIVATION_TOKEN,
    GET_ACTIVATE_EMAIL,
    GET_FORGOT_PWD_TOKEN,
    SEND_NEW_PASSWORD,
    RESET_PWD_SUCCESS
  } from './types';
  import axios from 'axios';
  import jwtDecode from 'jwt-decode';
  
  export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING });
    axios
      .post("/users/login", userData)
      .then(res => { 
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: SET_AUTHENTICATED });
        dispatch({ type: CLEAR_ERRORS });
      })
      .catch(err =>
        // console.log(err.response.data)
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        })
      );
  };
  
  export const signupUser = (userData) => dispatch => {
    dispatch({ type: LOADING });
    axios
      .post("/users/signup", userData)
      .then(res => { 
        dispatch({ type: GET_ACTIVATE_EMAIL });
        // setAuthorizationHeader(res.data.token);
        // dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
      })
      .catch(err =>
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data

        })
      );
  };
  export const authUser = userData => dispatch => {
    axios
      .post("/users/auth", userData)
      .then(res => {
        dispatch({ type: SET_AUTHENTICATED });
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
      })
      .catch(err =>
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data

        }))
  };
  export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('jwtToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
  };

  export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING });
   const  token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    console.log(decodedToken)
    axios
      .get(`/users/${decodedToken.id}`)
      .then((res) => {
        dispatch({
          type: GET_USER,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  const setAuthorizationHeader = (token) => {
    const jwtToken = `bearer ${token}`;
    localStorage.setItem('jwtToken', jwtToken);
    axios.defaults.headers.common['Authorization'] = jwtToken;
  };

  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  }

  export const redirecteUserToAuth = (path) => (dispatch) => {
    dispatch({ type : REDIRECT_USER_TO_AUTH,
              payload: path });
  }
  export const addUserDetail = (userData) => (dispatch) => {
    dispatch({ type: ADD_USER_DETAILS });
    axios
    .put('/users/', userData)
    .then(res => { 
      dispatch(getUserData());
    })
    .catch(err =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    );
  }
  export const activateAccount = (token) => (dispatch) => {
    dispatch({ type: LOADING });
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
    axios
    .post('/users/activate', {},{
      headers: headers
    })
    .then(res => { 
      dispatch({ type: SEND_ACTIVATION_TOKEN });
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: SET_AUTHENTICATED });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    );
  }
 
  export const sendEmail = (email) => (dispatch) => {
    dispatch({ type: LOADING });
    axios
    .post('/users/forgot-password', email)
    .then(res => { 
      dispatch({ type: GET_FORGOT_PWD_TOKEN });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    );
  }

  export const resetPassword = (newPasswordData) => (dispatch) => {
    dispatch({ type: SEND_NEW_PASSWORD });
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${newPasswordData.resetLink}`
    }
    axios
    .post('/users/reset-password', newPasswordData,{
      headers: headers
    })
    .then(res => { 
      dispatch({ type: RESET_PWD_SUCCESS });
      // setAuthorizationHeader(res.data.token);
      // dispatch(getUserData());
      // dispatch({ type: SET_AUTHENTICATED });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err =>
      dispatch({
        type: SET_ERRORS,
        payload: err.err.response.data
      })
    );
  }