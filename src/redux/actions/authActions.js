import fetch from 'cross-fetch';

export const SIGNUP = 'SIGN_UP';
export const SIGNUP_REQUEST = 'REQUEST_SIGNUP';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

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
    receivedAt: Date.now()
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

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user: user,
    receivedAt: Date.now()
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
    receivedAt: Date.now()
  };
}

function logoutFailure() {
  return {
    type: LOGOUT_FAILURE,
    receivedAt: Date.now()
  };
}

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
          dispatch(loginSuccess(json.user));
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
