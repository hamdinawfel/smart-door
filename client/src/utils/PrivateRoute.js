import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const PrivateRoute = ({ component: Component, addedItems, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      addedItems.length !== 0 ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = state => ({
  addedItems : state.products.addedItems
});
export default connect(mapStateToProps)(PrivateRoute);