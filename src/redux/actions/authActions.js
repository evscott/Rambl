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
export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';

function requestSignup() {
  return {
    type: SIGNUP_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true
  };
}

function signupFailure() {
  return {
    type: SIGNUP_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false
  };
}

function signupSuccess() {
  return {
    type: SIGNUP_SUCCESS,
    lastUpdated: Date.now(),
    isAuthenticated: true,
    isFetching: false,
  };
}

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true
  };
}

function loginFailure() {
  return {
    type: LOGIN_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false
  };
}

function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
    lastUpdated: Date.now(),
    isAuthenticated: true,
    isFetching: false,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    lastUpdated: Date.now()
  };
}

function logoutFailure() {
  return {
    type: LOGOUT_FAILURE,
    lastUpdated: Date.now()
  };
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
    lastUpdated: Date.now(),
    isAuthenticated: false,
    user: null
  };
}

function getUserInfoRequest() {
  return {
    type: GET_USER_INFO_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true
  };
}

function getUserInfoFailure() {
  return {
    type: GET_USER_INFO_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
  };
}

function getUserInfoSuccess(user) {
  return {
    type: GET_USER_INFO_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    user: user,
  };
}

/**************************** Logical functions ****************************/

/**
 * Performs an http GET user info request to server.
 * Dispatches getUserInfoRequest to indicate the beginning of a getInfo process.
 * Dispatches getUserInfoFailure to indicate the end of a failed getInfo process.
 * Dispatches getUserInfoSuccess to indicate the end of a successful getInfo process.
 * If getUserInfo process succeeds, a user object is received and passed into
 * getUserInfoSuccess to be stored into state.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
function getUserInfo() {
  return dispatch => {
    dispatch(getUserInfoRequest());
    return fetch('http://localhost:4201/user/getinfo', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'get'
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(getUserInfoFailure());
        else dispatch(getUserInfoSuccess(json.result[0]));
      });
  };
}

/**
 * Performs an http POST signup request to server.
 * Dispatches requestSignup to indicate the beginning of a signup process.
 * Dispatches signupFailure to indicate the end of a failed signup process.
 * Dispatches signupSuccess to indicate the end of a successful signup process.
 * If signup process succeeds, a json web token is received and stored into
 * users local storage and getUserInfo is dispatched.
 * @param user object containing email, password, f_name, l_name.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
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
          dispatch(signupSuccess());
          dispatch(getUserInfo());
        }
      });
  };
}

/**
 * Performs an http POST login request to server.
 * Dispatches requestLogin to indicate the beginning of a login process.
 * Dispatches loginFailure to indicate the end of a failed login process.
 * Dispatches loginSuccess to indicate the end of a successful login process.
 * If login process succeeds, a json web token is received and stored into
 * users local storage and getUserInfo is dispatched.
 * @param user object containing email, password.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
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
          dispatch(getUserInfo());
        }
      });
  };
}

/**
 * Performs a "logout" operation by removing json web token from local storage
 * if one exists.
 * Dispatches requestLogout to indicate beginning of logout process.
 * Dispatches logoutFailure to indicate the end of a failed logout process.
 * Dispatches logoutSuccess to indicate the end of a successful logout process.
 * @returns {Function} dispatch results.
 */
export function logout() {
  return dispatch => {
    dispatch(requestLogout());
    let token = localStorage.getItem('token');
    if (!token) {
      dispatch(logoutFailure());
    } else {
      localStorage.removeItem('token');
      dispatch(logoutSuccess());
    }
  };
}
