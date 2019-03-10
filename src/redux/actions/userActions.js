import fetch from 'cross-fetch';
import { hostUrl } from '../../shared/Config';

export const GET_USER_INFO_FROM_DB_REQUEST = 'GET_USER_INFO_FROM_DB_REQUEST';
export const GET_USER_INFO_FROM_DB_FAILURE = 'GET_USER_INFO_FROM_DB_FAILURE';
export const GET_USER_INFO_FROM_DB_SUCCESS = 'GET_USER_INFO_FROM_DB_SUCCESS';
export const UPDATE_USER_INFO_IN_DB_REQUEST = 'UPDATE_USER_INFO_IN_DB_REQUEST';
export const UPDATE_USER_INFO_IN_DB_FAILURE = 'UPDATE_USER_INFO_IN_DB_FAILURE';
export const UPDATE_USER_INFO_IN_DB_SUCCESS = 'UPDATE_USER_INFO_IN_DB_SUCCESS';

function getUserInfoFromDbRequest() {
  return {
    type: GET_USER_INFO_FROM_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true
  };
}

function getUserInfoFromDbFailure() {
  return {
    type: GET_USER_INFO_FROM_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false
  };
}

function getUserInfoFromDbSuccess(user) {
  return {
    type: GET_USER_INFO_FROM_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    user: user
  };
}

function updateUserInfoInDbRequest() {
  return {
    type: UPDATE_USER_INFO_IN_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function updateUserInfoInDbFailure() {
  return {
    type: UPDATE_USER_INFO_IN_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function updateUserInfoInDbSuccess() {
  return {
    type: UPDATE_USER_INFO_IN_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

/**************************** Logical functions ****************************/

/**
 * Performs an http GET user info request to server.
 * Dispatches getUserInfoFromDbRequest to indicate the beginning of a getInfo process.
 * Dispatches getUserInfoFromDbFailure to indicate the end of a failed getInfo process.
 * Dispatches getUserInfoFromDbSuccess to indicate the end of a successful getInfo process.
 * If getUserInfoFromDb process succeeds, a user object is received and passed into
 * getUserInfoFromDbSuccess to be stored into state.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function getUserInfoFromDb() {
  return (dispatch) => {
    dispatch(getUserInfoFromDbRequest());
    return fetch(hostUrl + '/user/getinfo', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'get'
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.length === 0) dispatch(getUserInfoFromDbFailure());
        else dispatch(getUserInfoFromDbSuccess(json.result[0]));
      });
  };
}

/**
 * Performs an http PUT updateUserInfoInDb request to server.
 * Dispatches updateUserInfoInDb to indicate the beginning of an updateUserInfoInDb process.
 * Dispatches updateUserInfoInDbFailure to indicate the end of a failed updateUserInfoInDb process.
 * Dispatches updateUserInfoInDbSuccess to indicate the end of a successful updateUserInfoInDb process.
 * If updateUserInfoInDb process succeeds, the outdated trip is filtered out of the state list
 * and getTripInfoFromDb is dispatched using the trip_id of the updated trip.
 * @param trip object containing name, dscript, trip_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function updateUserInfoInDb(user) {
  return (dispatch) => {
    dispatch(updateUserInfoInDbRequest()); // Update trip request process has begun...
    return fetch(hostUrl + '/user/update', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'PUT',
      body: JSON.stringify(user)
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success === false) dispatch(updateUserInfoInDbFailure());
        else {
          dispatch(updateUserInfoInDbSuccess());
          dispatch(getUserInfoFromDb());
        }
      });
  };
}
