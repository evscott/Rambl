import { mockStore } from '../mock-server/mockStore';
import { getSortedTrips, getCurrTrip } from '../getters/getTrips';
import { getTripTimes } from '../getters/getTripTimes';
import { convertDate } from '../getters/convertDate';

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

/**
 * Checks if getting the trip duration is correct.
 */
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

/**
 * Ensures that all of the trips are gotten and sorted appropriately.
 * Makes sure active ones are not over, and past ones are indeed over.
 */
it('Gets all active trips and sorts them appropriately', () => {
  // Get the trips
  const store = makeStore(mockStore());
  const sortedTrips = getSortedTrips(store.getState());

  // Get a baseline for ordering the trips
  let prevDate = sortedTrips.active[0].trip_start;

  // Go through every trip to make sure they're in order
  // and in the future
  sortedTrips.active.forEach((trip) => {
    let startDate = convertDate(trip.trip_start);
    let endDate = convertDate(trip.trip_end);

    // If prev trip start was null, this one is too
    if (prevDate == null) expect(startDate).toBeFalsy();
    // If this trip's start date is not null, should start after prev trip
    else if (startDate !== null) expect(startDate >= prevDate).toBeTruthy();

    // else, we have null and it's in order
    prevDate = startDate;

    // Make sure it ends in the future, or it never ends
    expect(endDate >= new Date() || endDate === null).toBeTruthy();
  });

  prevDate = sortedTrips.inactive[0].trip_start;

  // Go through every trip to make sure they're in order
  // and in the past
  sortedTrips.inactive.forEach((trip) => {
    let startDate = convertDate(trip.trip_start);
    let endDate = convertDate(trip.trip_end);

    // Should never be null
    expect(startDate).toBeTruthy();

    // Should start after prev trip
    expect(startDate >= prevDate).toBeTruthy();
    prevDate = startDate;

    // Make sure it ends in the past
    expect(
      endDate < new Date() || (endDate === null && startDate < new Date())
    ).toBeTruthy();
  });
});

/**
 * Gets the current trip, if there is one. Tests to make sure that it is
 * indeed the current trip.
 */
it('Gets the current trip', () => {
  const store = makeStore(mockStore());
  let currTrip = getCurrTrip(store.getState());
  if (currTrip.current) {
    expect(convertDate(currTrip.trip.trip_start) <= new Date()).toBeTruthy();
    expect(convertDate(currTrip.trip.trip_end) >= new Date()).toBeTruthy();
  } else {
    if (currTrip.trip !== null)
      expect(convertDate(currTrip.trip.trip_start) > new Date()).toBeTruthy();
  }
});
