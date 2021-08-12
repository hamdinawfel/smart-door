import { combineReducers } from 'redux';

import catalogReducer from '../pages/catalog/reducer';
import cartReducer from '../pages/cart/reducer';
import checkoutReducer from '../pages/checkout/reducer';
import subscriberReducer from '../utils/subscribe/reducer';

const rootReducer = combineReducers({

    catalog: catalogReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    subscriber: subscriberReducer,
  })
  
export default rootReducer;