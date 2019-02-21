import { combineReducers } from 'redux';
import {
  SIGNUP,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../actions/authActions';

function signup(
  state = {
    isFetching: false,
    user: [],
    lastUpdated: null
  },
  action
) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        user: null,
        lastUpdated: action.receivedAt
      });
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.user,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function login(
  state = {
    isFetching: false,
    user: [],
    lastUpdated: null
  },
  action
) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        user: null,
        lastUpdated: action.receivedAt
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.user,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function logout(
  state = {
    isFetching: false,
    user: [],
    lastUpdated: null
  },
  action
) {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isFetching: false,
        user: null,
        lastUpdated: action.receivedAt
      });
    case LOGOUT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        user: null,
        lastUpdated: action.receivedAt
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        user: null,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function authenticate(
  state = {
    isFetching: false,
    user: [],
    lastUpdated: null
  },
  action
) {
  switch (action.type) {
    case SIGNUP:
      return Object.assign({}, state, {
        [action.user]: signup(state[action.user], action)
      });
    case LOGIN:
      return Object.assign({}, state, {
        [action.user]: login(state[action.user], action)
      });
    case LOGOUT:
      return Object.assign({}, state, {
        [action.user]: logout(state[action.user], action)
      });
    default:
      return state;
  }
}

const authReducer = combineReducers({
  authenticate
});

export default authReducer;
