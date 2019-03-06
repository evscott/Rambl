import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { tripReducer } from './tripReducer';
import { planReducer } from './planReducer';
import { tranReducer } from './tranReducer';
import { accomReducer } from './accomReducer';

const rootReducer = combineReducers({
  user: authReducer,
  trips: tripReducer,
  plans: planReducer,
  trans: tranReducer,
  accoms: accomReducer
});

export default rootReducer;
