import React from 'react';
import { planReducer } from '../reducers/planReducer';
import * as PlanActions from '../actions/planActions';
import { logoutSuccess } from '../actions/authActions';

describe('planReducer', () => {
  it('should return the initial state', () => {
    // Get initial state
    const state = planReducer(undefined, {});

    // Check that the state is correct
    expect(state).toEqual({
      lastUpdated: null,
      isFetching: false,
      isSynced: false,
      plans: []
    });
  });

  it('should add plans to the store on the action GET_PLANS_FROM_DB_SUCCESS', () => {
    // Get initial state
    let state = planReducer(undefined, {});

    // Perform action
    state = planReducer(
      state,
      PlanActions.getPlansFromDbSuccess([
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
      plans: [{ test: 'This is a test' }]
    });
  });

  it('should remove plans from the store on the action LOGOUT_SUCCESS', () => {
    // Make initial state
    let state = {
      lastUpdated: null,
      isFetching: false,
      isSynced: false,
      plans: [{ test: 'This is a test' }]
    };

    // Log out
    state = planReducer(state, logoutSuccess());

    // Test the state after action: it should have removed the plan
    delete state.lastUpdated;
    expect(state).toEqual({
      isFetching: false,
      isSynced: false,
      plans: []
    });
  });
});
