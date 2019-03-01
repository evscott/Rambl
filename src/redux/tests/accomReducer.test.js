import React from 'react';
import { accomReducer } from '../reducers/accomReducer';
import * as AccomActions from '../actions/accomActions';
import { logoutSuccess } from '../actions/authActions';

describe('accomReducer', () => {
  it('should return the initial state', () => {

    // Get initial state
    const state = accomReducer(undefined, {});

    // Check that the state is correct
    expect(state).toEqual({
      lastUpdated: null,
      isFetching: false,
      isSynced: false,
      accoms: []
    });
  });

  it('should add accoms to the store on the action GET_ACCOMS_FROM_DB_SUCCESS', () => {

    // Get initial state
    let state = accomReducer(undefined, {});

    // Perform action
    state = accomReducer(state, AccomActions.getAccomsFromDbSuccess([{
      test: 'This is a test'
    }]));

    // Test the state after action: it should have added the plan
    delete state.lastUpdated; // Don't test this, because it varies too much
    expect(state).toEqual({
      isFetching: false,
      isSynced: true,
      accoms: [{ test: 'This is a test' }]
    });
  });

  it('should remove accoms from the store on the action LOGOUT_SUCCESS', () => {

    // Make initial state
    let state = {
      lastUpdated: null,
      isFetching: false,
      isSynced: false,
      accoms: [{ test: 'This is a test' }]
    };

    // Log out
    state = accomReducer(state, logoutSuccess());

    // Test the state after action: it should have removed the plan
    delete state.lastUpdated;
    expect(state).toEqual({
      isFetching: false,
      isSynced: false,
      accoms: []
    });
  });
});
