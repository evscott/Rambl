import fetch from 'cross-fetch';

export const SIGNUP = 'SIGN_UP';
export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

export function signup(user) {
  return {
    type: SIGN_UP,
    user
  };
}

function requestSignup(user) {
  return {
    type: REQUEST_SIGNUP,
    user
  };
}

function signupSuccess(user, json) {
  return {
    type: SIGNUP_SUCCESS,
    user: json.data.children.map(child => child.data),
    receivedAt: Data.now()
  };
}

function submitSignup(user) {
  let data = {
    email: user.email,
    password: user.password,
    firstname: user.firstname,
    lastname: user.lastname
  };
  return dispatch => {
    dispatch(requestSignup(user)); // Signup request process has begun...
    return fetch('http://localhost:4201/signup', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(json => dispatch(signupSuccess(user, json)));
  }
}