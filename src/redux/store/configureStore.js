import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import authReducer from '../reducers/authReducers';

const loggerMiddleware = createLogger();

export default function configureStore() {
  return createStore(
    authReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
}
