import { filterSingleDimensionalArray } from '../../shared/filterArray';
import { updateSingleDimensionalArray } from '../../shared/updateArray';
import * as TripActions from '../actions/tripActions';

const initialState = {
  lastUpdated: null,
  isFetching: false,
  isSynced: false,
  trips: []
};

export function tripReducer(state = initialState, action) {
  switch (action.type) {
    case TripActions.GET_TRIPS_FROM_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case TripActions.GET_TRIPS_FROM_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case TripActions.GET_TRIPS_FROM_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case TripActions.ADD_TRIP_TO_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case TripActions.ADD_TRIP_TO_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case TripActions.ADD_TRIP_TO_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case TripActions.ADD_TRIP_TO_STATE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        trips: updateSingleDimensionalArray(
          state.trips,
          action.tripToAdd.trip_id,
          action.tripToAdd
        )
      };
    case TripActions.UPDATE_TRIP_IN_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case TripActions.UPDATE_TRIP_IN_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case TripActions.UPDATE_TRIP_IN_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case TripActions.DELETE_TRIP_IN_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case TripActions.DELETE_TRIP_IN_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case TripActions.DELETE_TRIP_IN_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case TripActions.DELETE_TRIP_IN_STATE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        trips: filterSingleDimensionalArray(
          state.trips,
          action.tripToDelete.trip_id,
          action.tripToDelete.e_id
        )
      };
    case TripActions.GET_TRIP_INFO_FROM_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case TripActions.GET_TRIP_INFO_FROM_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case TripActions.GET_TRIP_INFO_FROM_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    default:
      return state;
  }
}
