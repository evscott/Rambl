import { combineReducers } from 'redux';
import {
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_FAILURE,
  GET_USER_INFO_SUCCESS
} from '../actions/authActions';

const initialState = {
  lastUpdated: null,
  isAuthenticated: false,
  isFetching: false,
  user: []
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isAuthenticated: action.isAuthenticated,
        isFetching: action.isFetching
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isAuthenticated: action.isAuthenticated,
        isFetching: action.isFetching
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isAuthenticated: action.isAuthenticated,
        user: action.user
      };
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching
      };
    case GET_USER_INFO_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching
      };
    case GET_USER_INFO_SUCCESS:
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
