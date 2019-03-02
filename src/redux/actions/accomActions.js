import fetch from 'cross-fetch';
import { hostUrl } from '../../shared/Config';

export const GET_ACCOMS_FROM_DB_REQUEST = 'GET_ACCOMS_FROM_DB_REQUEST';
export const GET_ACCOMS_FROM_DB_FAILURE = 'GET_ACCOMS_FROM_DB_FAILURE';
export const GET_ACCOMS_FROM_DB_SUCCESS = 'GET_ACCOMS_FROM_DB_SUCCESS';
export const ADD_ACCOM_TO_DB_REQUEST = 'ADD_ACCOM_TO_DB_REQUEST';
export const ADD_ACCOM_TO_DB_FAILURE = 'ADD_ACCOM_TO_DB_FAILURE';
export const ADD_ACCOM_TO_DB_SUCCESS = 'ADD_ACCOM_TO_DB_SUCCESS';
export const ADD_ACCOM_TO_STATE = 'ADD_ACCOM_TO_STATE';
export const UPDATE_ACCOM_IN_DB_REQUEST = 'UPDATE_ACCOM_IN_DB_REQUEST';
export const UPDATE_ACCOM_IN_DB_FAILURE = 'UPDATE_ACCOM_IN_DB_FAILURE';
export const UPDATE_ACCOM_IN_DB_SUCCESS = 'UPDATE_ACCOM_IN_DB_SUCCESS';
export const DELETE_ACCOM_IN_DB_REQUEST = 'DELETE_ACCOM_IN_DB_REQUEST';
export const DELETE_ACCOM_IN_DB_FAILURE = 'DELETE_ACCOM_IN_DB_FAILURE';
export const DELETE_ACCOM_IN_DB_SUCCESS = 'DELETE_ACCOM_IN_DB_SUCCESS';
export const DELETE_ACCOM_IN_STATE = 'DELETE_ACCOM_IN_STATE';
export const GET_ACCOM_INFO_FROM_DB_REQUEST = 'GET_ACCOM_INFO_FROM_DB_REQUEST';
export const GET_ACCOM_INFO_FROM_DB_FAILURE = 'GET_ACCOM_INFO_FROM_DB_FAILURE';
export const GET_ACCOM_INFO_FROM_DB_SUCCESS = 'GET_ACCOM_INFO_FROM_DB_SUCCESS';

function getAccomsFromDbRequest() {
  return {
    type: GET_ACCOMS_FROM_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function getAccomsFromDbFailure() {
  return {
    type: GET_ACCOMS_FROM_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

export function getAccomsFromDbSuccess(accoms) {
  return {
    type: GET_ACCOMS_FROM_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    accoms: accoms
  };
}

function addAccomToDbRequest() {
  return {
    type: ADD_ACCOM_TO_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function addAccomToDbFailure() {
  return {
    type: ADD_ACCOM_TO_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function addAccomToDbSuccess() {
  return {
    type: ADD_ACCOM_TO_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

function addAccomToState(accomToAdd) {
  return {
    type: ADD_ACCOM_TO_STATE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    accomToAdd: accomToAdd
  };
}

function updateAccomInDbRequest() {
  return {
    type: UPDATE_ACCOM_IN_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function updateAccomInDbFailure() {
  return {
    type: UPDATE_ACCOM_IN_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function updateAccomInDbSuccess(accoms) {
  return {
    type: UPDATE_ACCOM_IN_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    accoms: accoms
  };
}

function deleteAccomInDbRequest() {
  return {
    type: DELETE_ACCOM_IN_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function deleteAccomInDbFailure() {
  return {
    type: DELETE_ACCOM_IN_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function deleteAccomInDbSuccess() {
  return {
    type: DELETE_ACCOM_IN_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

function deleteAccomInState(accomToDelete) {
  return {
    type: DELETE_ACCOM_IN_STATE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    accomToDelete: accomToDelete
  };
}

function getAccomInfoFromDbRequest() {
  return {
    type: GET_ACCOM_INFO_FROM_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function getAccomInfoFromDbFailure() {
  return {
    type: GET_ACCOM_INFO_FROM_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function getAccomInfoFromDbSuccess() {
  return {
    type: GET_ACCOM_INFO_FROM_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

/**************************** Logical functions ****************************/

/**
 * Performs a dynamic GET accom info request to server.
 * Dispatches getUserInfoRequest to indicate the beginning of a getAccomInfoFromDb process.
 * Dispatches getAccomInfoFromDbFailure to indicate the end of a failed getAccomInfoFromDb process.
 * Dispatches getAccomSuccess to indicate the end of a successful getAccomInfoFromDb process.
 * If getAccomInfoFromDb process succeeds, a accom list object is received and passed into
 * getAccomInfoFromDbSuccess to be stored into state.
 * @param e_id of accommodation to fetch from database.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
function getAccomInfoFromDb(e_id) {
  return dispatch => {
    dispatch(getAccomInfoFromDbRequest());
    return fetch(hostUrl + `/accom/get/${e_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'get'
    })
      .then(response => response.json())
      .then(json => {
        if (json.length === 0) dispatch(getAccomInfoFromDbFailure());
        else {
          dispatch(getAccomInfoFromDbSuccess());
          dispatch(addAccomToState(json.result[0]));
        }
      });
  };
}

/**
 * Performs an http GET accoms request to server.
 * Dispatches getAccomsFromDb to indicate the beginning of a getAccomsFromDb process.
 * Dispatches getAccomsFromDbFailure to indicate the end of a failed getAccomsFromDb process.
 * Dispatches getAccomsFromDbSuccess to indicate the end of a successful getAccomsFromDb process.
 * If getAccomsFromDb process succeeds, a accoms object is received and passed into
 * getAccomsFromDbSuccess to be stored into state.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function getAccomsFromDb() {
  return dispatch => {
    dispatch(getAccomsFromDbRequest()); // Get accoms request process has begun...
    return fetch(hostUrl + '/accom/get', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(getAccomsFromDbFailure());
        else {
          let accoms = [];
          json.result.forEach(t => {
            if (accoms[t.trip_id] === undefined) accoms[t.trip_id] = {};
            accoms[t.trip_id][t.e_id] = t;
          });
          dispatch(getAccomsFromDbSuccess(accoms));
        }
      });
  };
}

/**
 * Performs an http POST addAccomToDb request to server.
 * Dispatches addAccomToDb to indicate the beginning of an addAccomToDb process.
 * Dispatches addAccomToDbFailure to indicate the end of a failed addAccomToDb process.
 * Dispatches addAccomToDbSuccess to indicate the end of a successful addAccomToDb process.
 * If addAccomToDb process succeeds, getAccomInfoFromDb is dispatched using the returned
 * e_id of the newly added accom.
 * @param accom object containing email, name, and dscript.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function addAccomToDb(accom) {
  return dispatch => {
    dispatch(addAccomToDbRequest()); // Add accom request process has begun...
    return fetch(hostUrl + '/accom/add', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'POST',
      body: JSON.stringify(accom)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(addAccomToDbFailure());
        else {
          dispatch(addAccomToDbSuccess());
          dispatch(getAccomInfoFromDb(json.result));
        }
      });
  };
}

/**
 * Performs an http PUT updateAccomInDb request to server.
 * Dispatches updateAccomInDb to indicate the beginning of an updateAccomInDb process.
 * Dispatches updateAccomInDbFailure to indicate the end of a failed updateAccomInDb process.
 * Dispatches updateAccomInDbSuccess to indicate the end of a successful updateAccomInDb process.
 * If updateAccomInDb process succeeds, the outdated accom is filtered out of the state list
 * and getAccomInfoFromDb is dispatched using the e_id of the updated accom.
 * @param accom object containing name, dscript, e_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function updateAccomInDb(accom) {
  return dispatch => {
    dispatch(updateAccomInDbRequest()); // Update accom request process has begun...
    return fetch(hostUrl + '/accom/update', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'PUT',
      body: JSON.stringify(accom)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(updateAccomInDbFailure());
        else {
          dispatch(updateAccomInDbSuccess());
          dispatch(getAccomInfoFromDb(accom.e_id));
        }
      });
  };
}

/**
 * Performs an http DELETE deleteAccomInDb request to server.
 * Dispatches deleteAccomInDb to indicate the beginning of a deleteAccomInDb process.
 * Dispatches deleteAccomInDbFailure to indicate the end of a failed deleteAccomInDb process.
 * Dispatches deleteAccomInDbSuccess to indicate the end of a successful deleteAccomInDb process.
 * If deleteAccomInDb process succeeds, the deleted accom is filtered out of the
 * state accom list.
 * @param accom object containing name, dscript, e_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function deleteAccomInDb(accom) {
  return dispatch => {
    dispatch(deleteAccomInDbRequest()); // Delete accom request process has begun...
    return fetch(hostUrl + '/accom/delete', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'DELETE',
      body: JSON.stringify(accom)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(deleteAccomInDbFailure());
        else {
          dispatch(deleteAccomInDbSuccess());
          dispatch(deleteAccomInState(accom));
        }
      });
  };
}
