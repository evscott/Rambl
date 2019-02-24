import {
  GET_TRIPS_REQUEST,
  GET_TRIPS_FAILURE,
  GET_TRIPS_SUCCESS,
  ADD_TRIP_REQUEST,
  ADD_TRIP_FAILURE,
  ADD_TRIP_SUCCESS,
  UPDATE_TRIP_REQUEST,
  UPDATE_TRIP_FAILURE,
  UPDATE_TRIP_SUCCESS,
  DELETE_TRIP_REQUEST,
  DELETE_TRIP_FAILURE,
  DELETE_TRIP_SUCCESS
} from '../actions/tripActions';

const initialState = {
  lastUpdated: null,
  isFetching: false,
  isSynced: false,
  trip: []
};

export function tripReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRIPS_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      }
    case GET_TRIPS_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
      }
    case GET_TRIPS_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        trips: action.trips
      }
    case ADD_TRIP_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      }
    case ADD_TRIP_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
      }
    case ADD_TRIP_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        trips: action.trips
      }
    case UPDATE_TRIP_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      }
    case UPDATE_TRIP_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
      }
    case UPDATE_TRIP_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        trips: action.trips
      }
    case DELETE_TRIP_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      }
    case DELETE_TRIP_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
      }
    case DELETE_TRIP_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        trips: action.trips
      }
    default:
      return state
  }
}


