import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//M-UI
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
//utils
import ScrollToTop from './utils/ScrollToTop';
//pages
import Home from './pages/home/index';
import Catalog from './pages/catalog/index';
import Cart from './pages/cart/index';
import Checkout from './pages/checkout/index';
//Redux setup
import store from './redux/store'
import { Provider } from 'react-redux';


function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
            <Router>
              <ScrollToTop />
              <div > 
                <Switch>
                  <Route exact path="/" component={ Home } />
                  <Route  path="/catalog/:category" component={ Catalog } />
                  <Route exact path="/cart" component={ Cart } />
                  <Route path="/checkout" component={ Checkout } />
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
      main: '#E82430', 
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

