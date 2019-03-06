import { filterMultiDimensionalArray } from '../../shared/filterArray';
import { updateMultiDimensionalArray } from '../../shared/updateArray';
import * as PlanActions from '../actions/planActions';
import { LOGOUT_SUCCESS } from '../actions/authActions';

const initialState = {
  lastUpdated: null,
  isFetching: false,
  isSynced: false,
  plans: []
};

export function planReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        plans: action.plans
      };
    case PlanActions.GET_PLANS_FROM_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.GET_PLANS_FROM_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.GET_PLANS_FROM_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        plans: action.plans
      };
    case PlanActions.ADD_PLAN_TO_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.ADD_PLAN_TO_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.ADD_PLAN_TO_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.ADD_PLAN_TO_STATE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        plans: updateMultiDimensionalArray(
          state.plans,
          action.planToAdd.trip_id,
          action.planToAdd.e_id,
          action.planToAdd
        )
      };
    case PlanActions.UPDATE_PLAN_IN_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.UPDATE_PLAN_IN_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.UPDATE_PLAN_IN_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.DELETE_PLAN_IN_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.DELETE_PLAN_IN_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.DELETE_PLAN_IN_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.DELETE_PLAN_IN_STATE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        plans: filterMultiDimensionalArray(
          state.plans,
          action.planToDelete.trip_id,
          action.planToDelete.e_id
        )
      };
    case PlanActions.GET_PLAN_INFO_FROM_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.GET_PLAN_INFO_FROM_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.GET_PLAN_INFO_FROM_DB_SUCCESS:
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
