import { mockStore } from '../mock-server/mockStore';
import { getSortedTrips, getCurrTrip } from './getTrips';
import { getTripTimes } from './getTripTimes';
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

it('Can get trip duration', () => {
  const store = makeStore(mockStore());
  const duration = getTripTimes(store.getState(), 1);
  expect(duration.trip_start.toUTCString()).toEqual(
    'Thu, 11 Apr 2019 15:32:32 GMT'
  );
  expect(duration.trip_end.toUTCString()).toEqual(
    'Thu, 16 May 2019 17:35:34 GMT'
  );
});

it('Gets all active trips and sorts them appropriately', () => {
  const store = makeStore(mockStore());
  console.log('This test will fail if the date is after May 2019.');
  const sortedTrips = getSortedTrips(store.getState());
  expect(sortedTrips.active).toContainEqual({
    user_id: 2,
    trip_id: 3,
    name: 'test trip4',
    dscript: 'description...',
    trip_start: convertDate('2019-01-01T18:32:32.000Z'),
    trip_end: convertDate('2021-01-01T15:32:34.000Z')
  });
  expect(sortedTrips.active).toContainEqual({
    user_id: 2,
    trip_id: 1,
    name: 'Sackville',
    dscript: 'Test trip',
    trip_start: convertDate('2019-04-11T15:32:32.000Z'),
    trip_end: convertDate('2019-05-16T17:35:34.000Z')
  });
  expect(sortedTrips.active).toContainEqual({
    user_id: 2,
    trip_id: 5,
    name: 'redux trip blah blah',
    dscript: '',
    trip_start: null,
    trip_end: null
  });
  expect(sortedTrips.active).toContainEqual({
    user_id: 2,
    trip_id: 4,
    name: 'updated',
    dscript: 'blah',
    trip_start: null,
    trip_end: null
  });

  expect(sortedTrips.inactive).toContainEqual({
    user_id: 2,
    trip_id: 6,
    name: "Trip that's already over",
    dscript: '',
    trip_start: convertDate('2000-01-01T10:32:32.000Z'),
    trip_end: convertDate('2001-01-01T15:32:34.000Z')
  });
  expect(sortedTrips.inactive).toContainEqual({
    user_id: 2,
    trip_id: 2,
    name: 'Bacon Adventure',
    dscript: 'Gr8 Times!',
    trip_start: convertDate('2019-01-01T10:32:32.000Z'),
    trip_end: convertDate('2019-01-02T10:32:32.000Z')
  });
});

it('Gets the current trip', () => {
  const store = makeStore(mockStore());
  console.log(
    'This test is time-dependent, so it needs to be verified in person.\n' +
      'One could test it more cleverly, but that would take more time.'
  );
  console.log(getCurrTrip(store.getState()));
});
