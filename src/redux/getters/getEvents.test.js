import { mockStore } from '../mock-server/mockStore';
import { getActiveEvents } from './getEvents';
import { convertDate } from './convertDate';

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

it('Gets all current and upcoming events and sorts them appropriately', () => {
  const store = makeStore(mockStore());
  console.log('This test will fail if the date is after May 2019.');
  const activeEvents = getActiveEvents(store.getState(), 1);
  expect(activeEvents.current).toEqual([
    //this is going to change at an insanely fast rate,
    // not sure how we want to test this... TODO
  ]);
  expect(activeEvents.upcoming).toEqual([
    //also a potentially weird test... TODO
  ]);
});
