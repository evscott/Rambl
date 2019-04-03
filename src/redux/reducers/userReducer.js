import * as UserActions from '../actions/userActions';
import * as AuthActions from '../actions/authActions';

const initialState = {
  lastUpdated: null,
  isAuthenticated: false,
  isFetching: false,
  user: []
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    /**************************** Auth Actions ****************************/
    case AuthActions.SIGNUP_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching
      };
    case AuthActions.SIGNUP_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching
      };
    case AuthActions.SIGNUP_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isAuthenticated: action.isAuthenticated,
        isFetching: action.isFetching
      };
    case AuthActions.LOGIN_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching
      };
    case AuthActions.LOGIN_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching
      };
    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isAuthenticated: action.isAuthenticated,
        isFetching: action.isFetching
      };
    case AuthActions.LOGOUT_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated
      };
    case AuthActions.LOGOUT_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated
      };
    case AuthActions.LOGOUT_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isAuthenticated: action.isAuthenticated,
        user: action.user
      };
    /**************************** User Actions ****************************/
    case UserActions.GET_USER_INFO_FROM_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching
      };
    case UserActions.GET_USER_INFO_FROM_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching
      };
    case UserActions.GET_USER_INFO_FROM_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        user: action.user
      };
    default:
      return state;
  }
}
