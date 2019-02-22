import fetch from 'cross-fetch';

export const SIGNUP_REQUEST = 'REQUEST_SIGNUP';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';

function requestSignup() {
  return {
    type: SIGNUP_REQUEST,
    receivedAt: Date.now()
  };
}

function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user: user,
    receivedAt: Date.now(),
    isAuthenticated: true
  };
}

function signupFailure() {
  return {
    type: SIGNUP_FAILURE,
    receivedAt: Date.now()
  };
}

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    receivedAt: Date.now()
  };
}

function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
    receivedAt: Date.now(),
    isAuthenticated: true
  };
}

function loginFailure() {
  return {
    type: LOGIN_FAILURE,
    receivedAt: Date.now()
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    receivedAt: Date.now()
  };
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
    user: null,
    receivedAt: Date.now(),
    isAuthenticated: false
  };
}

function logoutFailure() {
  return {
    type: LOGOUT_FAILURE,
    receivedAt: Date.now()
  };
}

function requestUserInfo() {
  return {
    type: REQUEST_USER_INFO,
    receivedAt: Date.now()
  };
}

function receiveUserInfo(user) {
  return {
    type: RECEIVE_USER_INFO,
    user: user,
    receivedAt: Date.now()
  };
}

// TODO should fetching token be handled with a separate success/failure action?
function fetchUserInfo() {
  return dispatch => {
    dispatch(requestUserInfo());
    return fetch('http://localhost:4201/user/getinfo', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'get'
    })
      .then(response => response.json())
      .then(json => dispatch(receiveUserInfo(json)));
  };
}

/** Exported functions **/
export function signup(user) {
  return dispatch => {
    dispatch(requestSignup(user)); // Signup request process has begun...
    return fetch('http://localhost:4201/signup', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(signupFailure());
        else {
          localStorage.setItem('token', json.token);
          dispatch(signupSuccess(json.user));
        }
      });
  };
}

export function login(user) {
  return dispatch => {
    dispatch(requestLogin(user)); // login request process has begun...
    return fetch('http://localhost:4201/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(loginFailure());
        else {
          localStorage.setItem('token', json.token);
          dispatch(loginSuccess());
          // TODO this maybe should be handled differently... TBD
          dispatch(fetchUserInfo());
        }
      });
  };
}

export function logout() {
  return dispatch => {
    dispatch(requestLogout());
    let token = localStorage.get('token');
    if (!token) {
      dispatch(logoutFailure());
    } else {
      localStorage.removeItem('token');
      dispatch(logoutSuccess());
    }
  };
}

