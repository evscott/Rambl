import {
  GET_TRIPS_REQUEST
} from '../actions/tripActions';

const initialState = {
  lastUpdated: null,
  isFetching: false,
  trip: []
};

export function tripReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRIPS_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching
      }
    default:
      return state
  }
}


