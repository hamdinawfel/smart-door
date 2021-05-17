import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//M-UI
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
//utils
import Footer from './utils/footer/index';
import ScrollToTop from './utils/ScrollToTop';
// import PrivateRoute from './utils/PrivateRoute';
//pages
import Home from './pages/home/index';
import Catalog from './pages/catalog/index';
import Error from './pages/error/index';

// import Cart from './pages/cart/index';
import Signup from './feature/auth/Signup';
import Activate from './feature/auth/Activate';
import ForgotPwd from './feature/auth/ForgotPwd';
import ResetPwd from './feature/auth/ResetPwd';
import Login from './feature/auth/Login';
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
              {/* <Navbar /> */}
              <div > 
                <Switch>
                  <Route exact path="/" component={ Home } />
                  {/* <Route exact path="/signup" component={ Signup } /> */}
                  {/* <Route exact path="/activate/:token" component={ Activate } /> */}
                  {/* <Route exact path="/forgot-password" component={ ForgotPwd } /> */}
                  {/* <Route exact path="/reset-password/:resetLink" component={ ResetPwd } /> */}
                  {/* <Route exact path="/login" component={ Login } /> */}
                  <Route exact path="/auth" component={ Auth } />
                  <Route  path="/catalog/:category" component={ Catalog } />
                  {/* <Route  path="/catalog" component={ Catalog } /> */}
                  {/* <Route exact path="/cart" component={ Cart } />
                  <Route exact path="/collecte" component={ Collecte } />
                  <PrivateRoute exact path="/checkout" component={ Checkout } /> */}
                  <Route exact path="/error" component={ Error } /> 
                </Switch>
              </div>
          <Footer />
          </Router>
      </ThemeProvider>
     </Provider>
  );
}

const theme = createMuiTheme({
  palette: {
     primary: {
      main: '#22223b',
      dark: '#5b4b48',
      light: '#f2e9e4',
      bleu:'#4a4e69',
      beige:'#c9ada7',
      orange:'#CA2D36'
    },
    secondary: {
      main: '#FAE3E3',
    },
  },
});

export default App;

