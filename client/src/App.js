import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//M-UI
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
//utils
import ScrollToTop from './utils/ScrollToTop';
import PrivateRoute from './utils/PrivateRoute';
//pages
import Home from './pages/home/index';
import Catalog from './pages/catalog/index';
import Cart from './pages/cart/index';
import Profile from './pages/profile/index';
import Checkout from './pages/checkout/index';
import Error from './pages/error/index';
//Feature
import Activate from './feature/auth/Activate';
import ResetPwd from './feature/auth/ResetPwd';
import Auth from './feature/auth/Auth';
//utils
// import PrivateRoute from './utils/PrivateRoute'

//Redux setup
import store from './redux/store'
import { Provider } from 'react-redux';
import { SET_AUTHENTICATED } from './feature/auth/types';
import { logoutUser, getUserData } from './feature/auth/action';
// Authentication setup
import jwtDecode from 'jwt-decode';

import axios from 'axios';
const token = localStorage.getItem("jwtToken");
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp *1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href='/login';
    
  }else{
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}
function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
            <Router>
              <ScrollToTop />
              <div > 
                <Switch>
                  <Route exact path="/" component={ Home } />
                  <Route exact path="/activate/:token" component={ Activate } />
                  <Route exact path="/reset-password/:resetLink" component={ ResetPwd } />
                  <Route exact path="/connextion" component={ Auth } />
                  <Route  path="/catalog/:category" component={ Catalog } />
                  <Route exact path="/cart" component={ Cart } />
                  <Route path="/checkout" component={ Checkout } />
                  <PrivateRoute exact path="/profile/:section" component={ Profile } />
                  
                </Switch>
              </div>
          </Router>
      </ThemeProvider>
     </Provider>
  );
}

const theme = createMuiTheme({
  palette: {
     primary: {
      main: '#E82430', // rgb(232, 36, 48)
      dark: '#5b4b48', 
      light: '#f2e9e4',
      bleu:'#4a4e69',
      beige:'#c9ada7',
      orange:'#CA2D36',
      white:'#EBEAF0'
    },
    secondary: {
      main: '#1976D2',
    },
  },
});

export default App;

