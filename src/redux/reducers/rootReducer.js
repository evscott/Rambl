import { combineReducers } from 'redux';
import { tripReducer } from './tripReducer';
import { planReducer } from './planReducer';
import { tranReducer } from './tranReducer';
import { accomReducer } from './accomReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  trips: tripReducer,
  plans: planReducer,
  trans: tranReducer,
  accoms: accomReducer
});

export default rootReducer;
