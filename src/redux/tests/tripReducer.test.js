import React from 'react';
import { tripReducer } from '../reducers/tripReducer';
import * as tripActions from '../actions/tripActions';
import { logoutSuccess } from '../actions/authActions';

describe('tripReducer', () => {
  it('should return the initial state', () => {
    // Get initial state
    const state = tripReducer(undefined, {});

    // Check that the state is correct
    expect(state).toEqual({
      lastUpdated: null,
      isFetching: false,
      isSynced: false,
      trips: []
    });
  });

  it('should add trips to the store on the action GET_TRIPS_FROM_DB_SUCCESS', () => {
    // Get initial state
    let state = tripReducer(undefined, {});

    // Perform action
    state = tripReducer(
      state,
      tripActions.getTripsFromDbSuccess([
        {
          test: 'This is a test'
        }
      ])
    );

    // Test the state after action: it should have added the plan
    delete state.lastUpdated; // Don't test this, because it varies too much
    expect(state).toEqual({
      isFetching: false,
      isSynced: true,
      trips: [{ test: 'This is a test' }]
    });
  });

  it('should remove trips from the store on the action LOGOUT_SUCCESS', () => {
    // Make initial state
    let state = {
      lastUpdated: null,
      isFetching: false,
      isSynced: false,
      trips: [{ test: 'This is a test' }]
    };

    // Log out
    state = tripReducer(state, logoutSuccess());

    // Test the state after action: it should have removed the plan
    delete state.lastUpdated;
    expect(state).toEqual({
      isFetching: false,
      isSynced: false,
      trips: []
    });
  });
});
