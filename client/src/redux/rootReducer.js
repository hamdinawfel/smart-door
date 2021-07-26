import { combineReducers } from 'redux';

import catalogReducer from '../pages/catalog/reducer';
import cartReducer from '../pages/cart/reducer';
import checkoutReducer from '../pages/checkout/reducer';
import profileReducer from '../pages/profile/reducer';
import userReducer from '../feature/auth/reducer';
import subscriberReducer from '../feature/subscribe/reducer';

const rootReducer = combineReducers({

    catalog: catalogReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    user: userReducer,
    profile: profileReducer,
    subscriber: subscriberReducer,
  })
  
export default rootReducer;