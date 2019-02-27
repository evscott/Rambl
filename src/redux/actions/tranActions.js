import fetch from 'cross-fetch';

export const GET_TRANS_FROM_DB_REQUEST = 'GET_TRANS_FROM_DB_REQUEST';
export const GET_TRANS_FROM_DB_FAILURE = 'GET_TRANS_FROM_DB_FAILURE';
export const GET_TRANS_FROM_DB_SUCCESS = 'GET_TRANS_FROM_DB_SUCCESS';
export const ADD_TRAN_TO_DB_REQUEST = 'ADD_TRAN_TO_DB_REQUEST';
export const ADD_TRAN_TO_DB_FAILURE = 'ADD_TRAN_TO_DB_FAILURE';
export const ADD_TRAN_TO_DB_SUCCESS = 'ADD_TRAN_TO_DB_SUCCESS';
export const ADD_TRAN_TO_STATE = 'ADD_TRAN_TO_STATE';
export const UPDATE_TRAN_IN_DB_REQUEST = 'UPDATE_TRAN_IN_DB_REQUEST';
export const UPDATE_TRAN_IN_DB_FAILURE = 'UPDATE_TRAN_IN_DB_FAILURE';
export const UPDATE_TRAN_IN_DB_SUCCESS = 'UPDATE_TRAN_IN_DB_SUCCESS';
export const DELETE_TRAN_IN_DB_REQUEST = 'DELETE_TRAN_IN_DB_REQUEST';
export const DELETE_TRAN_IN_DB_FAILURE = 'DELETE_TRAN_IN_DB_FAILURE';
export const DELETE_TRAN_IN_DB_SUCCESS = 'DELETE_TRAN_IN_DB_SUCCESS';
export const DELETE_TRAN_IN_STATE = 'DELETE_TRAN_IN_STATE';
export const GET_TRAN_INFO_FROM_DB_REQUEST = 'GET_TRAN_INFO_FROM_DB_REQUEST';
export const GET_TRAN_INFO_FROM_DB_FAILURE = 'GET_TRAN_INFO_FROM_DB_FAILURE';
export const GET_TRAN_INFO_FROM_DB_SUCCESS = 'GET_TRAN_INFO_FROM_DB_SUCCESS';

function getTransFromDbRequest() {
  return {
    type: GET_TRANS_FROM_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function getTransFromDbFailure() {
  return {
    type: GET_TRANS_FROM_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function getTransFromDbSuccess(trans) {
  return {
    type: GET_TRANS_FROM_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    trans: trans
  };
}

function addTranToDbRequest() {
  return {
    type: ADD_TRAN_TO_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function addTranToDbFailure() {
  return {
    type: ADD_TRAN_TO_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function addTranToDbSuccess() {
  return {
    type: ADD_TRAN_TO_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

function addTranToState(tranToAdd) {
  return {
    type: ADD_TRAN_TO_STATE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    tranToAdd: tranToAdd
  };
}

function updateTranInDbRequest() {
  return {
    type: UPDATE_TRAN_IN_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function updateTranInDbFailure() {
  return {
    type: UPDATE_TRAN_IN_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function updateTranInDbSuccess(trans) {
  return {
    type: UPDATE_TRAN_IN_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    trans: trans
  };
}

function deleteTranInDbRequest() {
  return {
    type: DELETE_TRAN_IN_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function deleteTranInDbFailure() {
  return {
    type: DELETE_TRAN_IN_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function deleteTranInDbSuccess() {
  return {
    type: DELETE_TRAN_IN_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

function deleteTranInState(tranToDelete) {
  return {
    type: DELETE_TRAN_IN_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    tranToDelete: tranToDelete
  };
}

function getTranInfoRequest() {
  return {
    type: GET_TRAN_INFO_FROM_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function getTranInfoFailure() {
  return {
    type: GET_TRAN_INFO_FROM_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function getTranInfoSuccess() {
  return {
    type: GET_TRAN_INFO_FROM_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

/**************************** Logical functions ****************************/

/**
 * Performs an http POST get tran info request to server.
 * Dispatches getUserInfoRequest to indicate the beginning of a getTranInfo process.
 * Dispatches getTranInfoFailure to indicate the end of a failed getTranInfo process.
 * Dispatches getTranSuccess to indicate the end of a successful getTranInfo process.
 * If getTranInfo process succeeds, a tran list object is received and passed into
 * getTranInfoSuccess to be stored into state.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
function getTranInfo(e_id) {
  return dispatch => {
    dispatch(getTranInfoRequest());
    return fetch('http://localhost:4201/tran/get', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'post',
      body: JSON.stringify({ e_id: e_id })
    })
      .then(response => response.json())
      .then(json => {
        if (json.length === 0) dispatch(getTranInfoFailure());
        else {
          dispatch(getTranInfoSuccess());
          dispatch(addTranToState(json.result[0]));
        }
      });
  };
}

/**
 * Performs an http GET trans request to server.
 * Dispatches getTransFromDb to indicate the beginning of a getTransFromDb process.
 * Dispatches getTransFromDbFailure to indicate the end of a failed getTransFromDb process.
 * Dispatches getTransFromDbSuccess to indicate the end of a successful getTransFromDb process.
 * If getTransFromDb process succeeds, a trans object is received and passed into
 * getTransFromDbSuccess to be stored into state.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function getTransFromDb() {
  return dispatch => {
    dispatch(getTransFromDbRequest()); // Get trans request process has begun...
    return fetch('http://localhost:4201/tran/get', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(getTransFromDbFailure());
        else {
          let trans = [];
          json.result.forEach(t => {
            if (trans[t.trip_id] === undefined) trans[t.trip_id] = {};
            trans[t.trip_id][t.e_id] = t;
          });
          dispatch(getTransFromDbSuccess(trans));
        }
      });
  };
}

/**
 * Performs an http POST addTranToDb request to server.
 * Dispatches addTranToDb to indicate the beginning of an addTranToDb process.
 * Dispatches addTranToDbFailure to indicate the end of a failed addTranToDb process.
 * Dispatches addTranToDbSuccess to indicate the end of a successful addTranToDb process.
 * If addTranToDb process succeeds, getTranInfo is dispatched using the returned
 * e_id of the newly added tran.
 * @param tran object containing email, name, and dscript.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function addTranToDb(tran) {
  return dispatch => {
    dispatch(addTranToDbRequest()); // Add tran request process has begun...
    return fetch('http://localhost:4201/tran/add', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'POST',
      body: JSON.stringify(tran)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(addTranToDbFailure());
        else {
          dispatch(addTranToDbSuccess());
          dispatch(getTranInfo(json.result));
        }
      });
  };
}

/**
 * Performs an http PUT updateTranInDb request to server.
 * Dispatches updateTranInDb to indicate the beginning of an updateTranInDb process.
 * Dispatches updateTranInDbFailure to indicate the end of a failed updateTranInDb process.
 * Dispatches updateTranInDbSuccess to indicate the end of a successful updateTranInDb process.
 * If updateTranInDb process succeeds, the outdated tran is filtered out of the state list
 * and getTranInfo is dispatched using the e_id of the updated tran.
 * @param tran object containing name, dscript, e_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function updateTranInDb(tran) {
  return dispatch => {
    dispatch(updateTranInDbRequest()); // Update tran request process has begun...
    return fetch('http://localhost:4201/tran/update', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'PUT',
      body: JSON.stringify(tran)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(updateTranInDbFailure());
        else {
          dispatch(updateTranInDbSuccess());
          dispatch(getTranInfo(tran.e_id));
        }
      });
  };
}

/**
 * Performs an http DELETE deleteTranInDb request to server.
 * Dispatches deleteTranInDb to indicate the beginning of a deleteTranInDb process.
 * Dispatches deleteTranInDbFailure to indicate the end of a failed deleteTranInDb process.
 * Dispatches deleteTranInDbSuccess to indicate the end of a successful deleteTranInDb process.
 * If deleteTranInDb process succeeds, the deleted tran is filtered out of the
 * state tran list.
 * @param tran object containing name, dscript, e_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function deleteTranInDb(tran) {
  return dispatch => {
    dispatch(deleteTranInDbRequest()); // Delete tran request process has begun...
    return fetch('http://localhost:4201/tran/delete', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'DELETE',
      body: JSON.stringify(tran)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(deleteTranInDbFailure());
        else {
          dispatch(deleteTranInDbSuccess());
          dispatch(deleteTranInState(tran));
        }
      });
  };
}
