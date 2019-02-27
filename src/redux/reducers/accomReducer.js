import { filterArray } from '../../shared/filterArray';
import { updateArray } from '../../shared/updateArray';
import * as AccomActions from '../actions/accomActions';

const initialState = {
  lastUpdated: null,
  isFetching: false,
  isSynced: false,
  accoms: []
};

export function accomReducer(state = initialState, action) {
  switch (action.type) {
    case AccomActions.GET_ACCOMS_FROM_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case AccomActions.GET_ACCOMS_FROM_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case AccomActions.GET_ACCOMS_FROM_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        accoms: action.accoms
      };
    case AccomActions.ADD_ACCOM_TO_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case AccomActions.ADD_ACCOM_TO_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case AccomActions.ADD_ACCOM_TO_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case AccomActions.ADD_ACCOM_TO_STATE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        accoms: updateArray(
          state.accoms,
          action.accomToAdd.trip_id,
          action.accomToAdd.e_id,
          action.accomToAdd
        )
      };
    case AccomActions.UPDATE_ACCOM_IN_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case AccomActions.UPDATE_ACCOM_IN_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case AccomActions.UPDATE_ACCOM_IN_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case AccomActions.DELETE_ACCOM_IN_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case AccomActions.DELETE_ACCOM_IN_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case AccomActions.DELETE_ACCOM_IN_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case AccomActions.DELETE_ACCOM_IN_STATE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        accoms: filterArray(
          state.accoms,
          action.accomToDelete.trip_id,
          action.accomToDelete.e_id
        )
      };
    case AccomActions.GET_ACCOM_INFO_FROM_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case AccomActions.GET_ACCOM_INFO_FROM_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case AccomActions.GET_ACCOM_INFO_FROM_DB_SUCCESS:
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