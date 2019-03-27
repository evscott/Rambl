import { mockStore } from '../mock-server/mockStore';

// Set up a mock store
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();
const middlewares = [thunkMiddleware, loggerMiddleware];
const makeStore = configureStore(middlewares);

it('Has a store', () => {
  const store = makeStore(mockStore());
  expect(store.getState()).toEqual(mockStore());
});
