import React from 'react';
import { userReducer } from '../reducers/userReducer';
import * as authActions from '../actions/authActions';

describe('userReducer', () => {
  it('should return the initial state', () => {
    // Get initial state
    const state = userReducer(undefined, {});

    // Check that the state is correct
    expect(state).toEqual({
      lastUpdated: null,
      isAuthenticated: false,
      isFetching: false,
      user: []
    });
  });

  it('should add user to the store on the action GET_USER_INFO_SUCCESS', () => {
    // Get initial state
    let state = userReducer(undefined, {});

    // Perform action
    state = userReducer(
      state,
      authActions.getUserInfoSuccess([
        {
          test: 'This is a test'
        }
      ])
    );

    // Test the state after action: it should have added the plan
    delete state.lastUpdated; // Don't test this, because it varies too much
    expect(state).toEqual({
      isAuthenticated: false,
      isFetching: false,
      user: [{ test: 'This is a test' }]
    });
  });

  it('should remove auths from the store on the action LOGOUT_SUCCESS', () => {
    // Make initial state
    let state = {
      isAuthenticated: false,
      isFetching: false,
      user: [{ test: 'This is a test' }]
    };

    // Log out
    state = userReducer(state, authActions.logoutSuccess());

    // Test the state after action: it should have removed the plan
    delete state.lastUpdated;
    expect(state).toEqual({
      isAuthenticated: false,
      isFetching: false,
      user: []
    });
  });
});
