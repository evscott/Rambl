import React from 'react';
import configureStore from '../store/configureStore';
import { login } from '../actions/authActions';
import { getTripsFromDb } from '../actions/tripActions';
import { mock, unMock } from '../mock-server/mockServer';
import { getAccomsFromDb } from '../actions/accomActions';
import { getPlansFromDb } from '../actions/planActions';
import { getTransFromDb } from '../actions/tranActions';

/**
 * Creates a store with the information from the fake database.
 * @param store
 * @returns {Promise<*>}
 */
let setupStore = async (store) => {
  return store.dispatch(login({}))
    .then(() => store.dispatch(getTripsFromDb()))
    .then(() => store.dispatch(getAccomsFromDb()))
    .then(() => store.dispatch(getPlansFromDb()))
    .then(() => store.dispatch(getTransFromDb()));
};

describe('active trip getter', () => {
  beforeEach(() => {
    mock();
  });

  afterEach(() => {
    unMock();
  });

  it('gets all current and future trips', () => {
    let store = configureStore();
    setupStore(store)
      .then(() => {
        // We never get to this line of code...
        console.log(store.getState());
        expect(store.getState().user.isAuthenticated).toEqual(false);
      });
  });
});

