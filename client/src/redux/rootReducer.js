import { combineReducers } from 'redux';

import catalogReducer from '../pages/catalog/reducer';
import userReducer from '../feature/auth/reducer';
import subscriberReducer from '../feature/subscribe/reducer';

const rootReducer = combineReducers({

    catalog: catalogReducer,
    user: userReducer,
    subscriber: subscriberReducer,
  })
  
export default rootReducer;