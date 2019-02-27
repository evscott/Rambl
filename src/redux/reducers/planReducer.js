import * as PlanActions from '../actions/planActions';

const initialState = {
  lastUpdated: null,
  isFetching: false,
  isSynced: false,
  plans: []
};

export function planReducer(state = initialState, action) {
  switch (action.type) {
    case PlanActions.GET_PLANS_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.GET_PLANS_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.GET_PLANS_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        plans: action.plans
      };
    case PlanActions.ADD_PLAN_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.ADD_PLAN_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.ADD_PLAN_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.UPDATE_PLAN_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.UPDATE_PLAN_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.UPDATE_PLAN_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.DELETE_PLAN_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.DELETE_PLAN_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.DELETE_PLAN_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        plans: action.plans
      };
    case PlanActions.GET_PLAN_INFO_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.GET_PLAN_INFO_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case PlanActions.GET_PLAN_INFO_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        plans: action.plans
      };
    default:
      return state;
  }
}