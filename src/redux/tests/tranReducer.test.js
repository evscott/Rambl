import { tranReducer } from '../reducers/tranReducer';
import * as tranActions from '../actions/tranActions';
import { logoutSuccess } from '../actions/authActions';

describe('tranReducer', () => {
  it('should return the initial state', () => {
    // Get initial state
    const state = tranReducer(undefined, {});

    // Check that the state is correct
    expect(state).toEqual({
      lastUpdated: null,
      isFetching: false,
      isSynced: false,
      trans: {}
    });
  });

  it('should add trans to the store on the action GET_TRANS_FROM_DB_SUCCESS', () => {
    // Get initial state
    let state = tranReducer(undefined, {});

    // Perform action
    state = tranReducer(
      state,
      tranActions.getTransFromDbSuccess([
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
      trans: [{ test: 'This is a test' }]
    });
  });

  it('should remove trans from the store on the action LOGOUT_SUCCESS', () => {
    // Make initial state
    let state = {
      lastUpdated: null,
      isFetching: false,
      isSynced: false,
      trans: [{ test: 'This is a test' }]
    };

    // Log out
    state = tranReducer(state, logoutSuccess());

    // Test the state after action: it should have removed the plan
    delete state.lastUpdated;
    expect(state).toEqual({
      isFetching: false,
      isSynced: false,
      trans: []
    });
  });
});
