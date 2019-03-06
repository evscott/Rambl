import React from 'react';
import { mockStore } from '../mock-server/mockStore';
import { getActiveTrips } from './getActiveTrips';
import { getTripTimes } from './getTripTimes';

// Set up a mock store
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
const loggerMiddleware = createLogger();
const middlewares = [thunkMiddleware, loggerMiddleware];
const makeStore = configureStore(middlewares);

const trip_id = 1;

it('Has a store', () => {
  const store = makeStore(mockStore());
  expect(store.getState()).toEqual(mockStore());
});

it('Can get trip duration', () => {
  const store = makeStore(mockStore());
  const duration = getTripTimes(store.getState(), 1);
  console.log(duration.trip_start.toUTCString());
});
