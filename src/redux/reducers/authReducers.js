import { combineReducers } from 'redux';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REQUEST_USER_INFO,
  RECEIVE_USER_INFO
} from '../actions/authActions';

function authenticate(
  state = {
    isFetching: false,
    user: [],
    lastUpdated: null,
    isAuthenticated: false,
  },
  action
) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.receivedAt
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.receivedAt
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.receivedAt,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.receivedAt,
        isAuthenticated: action.isAuthenticated
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        lastUpdated: action.receivedAt
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        lastUpdated: action.receivedAt
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        lastUpdated: action.receivedAt,
        isAuthenticated: false
      };
    case REQUEST_USER_INFO:
      return {
        ...state,
        lastUpdated: action.receivedAt,
      };
    case RECEIVE_USER_INFO:
      return {
        ...state,
        user: action.user,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
}

const authReducer = combineReducers({
  authenticate
});

export default authReducer;
