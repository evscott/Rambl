import fetch from 'cross-fetch';

export const GET_ACCOMS_REQUEST = 'GET_ACCOMS_REQUEST';
export const GET_ACCOMS_FAILURE = 'GET_ACCOMS_FAILURE';
export const GET_ACCOMS_SUCCESS = 'GET_ACCOMS_SUCCESS';
export const ADD_ACCOM_REQUEST = 'ADD_ACCOM_REQUEST';
export const ADD_ACCOM_FAILURE = 'ADD_ACCOM_FAILURE';
export const ADD_ACCOM_SUCCESS = 'ADD_ACCOM_SUCCESS';
export const UPDATE_ACCOM_REQUEST = 'UPDATE_ACCOM_REQUEST';
export const UPDATE_ACCOM_FAILURE = 'UPDATE_ACCOM_FAILURE';
export const UPDATE_ACCOM_SUCCESS = 'UPDATE_ACCOM_SUCCESS';
export const DELETE_ACCOM_REQUEST = 'DELETE_ACCOM_REQUEST';
export const DELETE_ACCOM_FAILURE = 'DELETE_ACCOM_FAILURE';
export const DELETE_ACCOM_SUCCESS = 'DELETE_ACCOM_SUCCESS';
export const GET_ACCOM_INFO_REQUEST = 'GET_ACCOM_INFO_REQUEST';
export const GET_ACCOM_INFO_FAILURE = 'GET_ACCOM_INFO_FAILURE';
export const GET_ACCOM_INFO_SUCCESS = 'GET_ACCOM_INFO_SUCCESS';

function getAccomsRequest() {
  return {
    type: GET_ACCOMS_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function getAccomsFailure() {
  return {
    type: GET_ACCOMS_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function getAccomsSuccess(accoms) {
  return {
    type: GET_ACCOMS_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    accoms: accoms
  };
}

function addAccomRequest() {
  return {
    type: ADD_ACCOM_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function addAccomFailure() {
  return {
    type: ADD_ACCOM_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function addAccomSuccess() {
  return {
    type: ADD_ACCOM_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

function updateAccomRequest() {
  return {
    type: UPDATE_ACCOM_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function updateAccomFailure() {
  return {
    type: UPDATE_ACCOM_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function updateAccomSuccess(accoms) {
  return {
    type: UPDATE_ACCOM_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    accoms: accoms
  };
}

function deleteAccomRequest() {
  return {
    type: DELETE_ACCOM_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function deleteAccomFailure() {
  return {
    type: DELETE_ACCOM_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function deleteAccomSuccess(accoms) {
  return {
    type: DELETE_ACCOM_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    accoms: accoms
  };
}

function getAccomInfoRequest() {
  return {
    type: GET_ACCOM_INFO_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function getAccomInfoFailure() {
  return {
    type: GET_ACCOM_INFO_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function getAccomInfoSuccess(accoms) {
  return {
    type: GET_ACCOM_INFO_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    accoms: accoms
  };
}

/**************************** Logical functions ****************************/

/**
 * Performs an http POST get accom info request to server.
 * Dispatches getUserInfoRequest to indicate the beginning of a getAccomInfo process.
 * Dispatches getAccomInfoFailure to indicate the end of a failed getAccomInfo process.
 * Dispatches getAccomSuccess to indicate the end of a successful getAccomInfo process.
 * If getAccomInfo process succeeds, a accom list object is received and passed into
 * getAccomInfoSuccess to be stored into state.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
function getAccomInfo(e_id) {
  return (dispatch, getState) => {
    dispatch(getAccomInfoRequest());
    return fetch('http://localhost:4201/accom/get', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'post',
      body: JSON.stringify({ e_id: e_id })
    })
      .then(response => response.json())
      .then(json => {
        if (json.length === 0) dispatch(getAccomInfoFailure());
        else {
          // Push newly added accom to state accom list
          let accoms = getState().masterReducer.accoms.accoms;
          let trip_id = json.result[0].trip_id;
          let e_id = json.result[0].e_id;
          if (accoms[trip_id] === undefined) accoms[trip_id] = {};
          accoms[trip_id][e_id] = json.result[0];
          dispatch(getAccomInfoSuccess(accoms));
        }
      });
  };
}

/**
 * Performs an http GET accoms request to server.
 * Dispatches getAccoms to indicate the beginning of a getAccoms process.
 * Dispatches getAccomsFailure to indicate the end of a failed getAccoms process.
 * Dispatches getAccomsSuccess to indicate the end of a successful getAccoms process.
 * If getAccoms process succeeds, a accoms object is received and passed into
 * getAccomsSuccess to be stored into state.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function getAccoms() {
  return dispatch => {
    dispatch(getAccomsRequest()); // Get accoms request process has begun...
    return fetch('http://localhost:4201/accom/get', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(getAccomsFailure());
        else {
          let accoms = [];
          json.result.forEach(t => {
            if (accoms[t.trip_id] === undefined) accoms[t.trip_id] = {};
            accoms[t.trip_id][t.e_id] = t;
          });
          dispatch(getAccomsSuccess(accoms));
        }
      });
  };
}

/**
 * Performs an http POST addAccom request to server.
 * Dispatches addAccom to indicate the beginning of an addAccom process.
 * Dispatches addAccomFailure to indicate the end of a failed addAccom process.
 * Dispatches addAccomSuccess to indicate the end of a successful addAccom process.
 * If addAccom process succeeds, getAccomInfo is dispatched using the returned
 * e_id of the newly added accom.
 * @param accom object containing email, name, and dscript.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function addAccom(accom) {
  return dispatch => {
    dispatch(addAccomRequest()); // Add accom request process has begun...
    return fetch('http://localhost:4201/accom/add', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'POST',
      body: JSON.stringify(accom)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(addAccomFailure());
        else {
          dispatch(addAccomSuccess());
          dispatch(getAccomInfo(json.result)); // Fetch added accom
        }
      });
  };
}

/**
 * Performs an http PUT updateAccom request to server.
 * Dispatches updateAccom to indicate the beginning of an updateAccom process.
 * Dispatches updateAccomFailure to indicate the end of a failed updateAccom process.
 * Dispatches updateAccomSuccess to indicate the end of a successful updateAccom process.
 * If updateAccom process succeeds, the outdated accom is filtered out of the state list
 * and getAccomInfo is dispatched using the e_id of the updated accom.
 * @param accom object containing name, dscript, e_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function updateAccom(accom) {
  return (dispatch, getState) => {
    dispatch(updateAccomRequest()); // Update accom request process has begun...
    return fetch('http://localhost:4201/accom/update', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'PUT',
      body: JSON.stringify(accom)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(updateAccomFailure());
        else {
          // Delete outdated accom, fetch updated accom
          let accoms = getState().masterReducer.accoms.accoms;
          delete accoms[accom.trip_id][accom.e_id];
          dispatch(updateAccomSuccess());
          dispatch(getAccomInfo(accom.e_id));
        }
      });
  };
}

/**
 * Performs an http DELETE deleteAccom request to server.
 * Dispatches deleteAccom to indicate the beginning of a deleteAccom process.
 * Dispatches deleteAccomFailure to indicate the end of a failed deleteAccom process.
 * Dispatches deleteAccomSuccess to indicate the end of a successful deleteAccom process.
 * If deleteAccom process succeeds, the deleted accom is filtered out of the
 * state accom list.
 * @param accom object containing name, dscript, e_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function deleteAccom(accom) {
  return (dispatch, getState) => {
    dispatch(deleteAccomRequest()); // Delete accom request process has begun...
    return fetch('http://localhost:4201/accom/delete', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'DELETE',
      body: JSON.stringify(accom)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(deleteAccomFailure());
        else {
          // Deleted accom from state accom list
          let accoms = getState().masterReducer.accoms.accoms;
          delete accoms[accom.trip_id][accom.e_id];
          dispatch(deleteAccomSuccess(accoms));
        }
      });
  };
}
