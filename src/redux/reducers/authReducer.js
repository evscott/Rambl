import { combineReducers } from 'redux';
import * as AuthActions from '../actions/authActions';

const initialState = {
  lastUpdated: null,
  isAuthenticated: false,
  isFetching: false,
  user: []
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
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
    case AuthActions.GET_USER_INFO_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching
      };
    case AuthActions.GET_USER_INFO_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching
      };
    case AuthActions.GET_USER_INFO_SUCCESS:
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
