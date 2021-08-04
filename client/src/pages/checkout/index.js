import React ,{ useEffect } from 'react'
import { Redirect } from 'react-router'
//COMPONENTS
import Header from './components/Header'
import MobileHeader from './components/MobileHeader'
import Main from './components/Main'
//redux
import { connect } from 'react-redux';
import { getCart } from '../cart/actions';


function Checkout(props) {

  useEffect(() => {
    props.getCart()
  }, []);

  return (
    <div>
      {/* {localStorage.newOrder?null:<Redirect to='/'/>} */}
      <Header />
      <MobileHeader />
      <Main />
    </div>
  )
}

const mapStateToProps = (state) => ({
  checkout: state.checkout
 });
 const mapActionsToProps =   {
  getCart,
};
 export default connect(
   mapStateToProps,
   mapActionsToProps
 )(Checkout);