import fetch from 'cross-fetch';

export const GET_TRANS_REQUEST = 'GET_TRANS_REQUEST';
export const GET_TRANS_FAILURE = 'GET_TRANS_FAILURE';
export const GET_TRANS_SUCCESS = 'GET_TRANS_SUCCESS';
export const ADD_TRAN_REQUEST = 'ADD_TRAN_REQUEST';
export const ADD_TRAN_FAILURE = 'ADD_TRAN_FAILURE';
export const ADD_TRAN_SUCCESS = 'ADD_TRAN_SUCCESS';
export const UPDATE_TRAN_REQUEST = 'UPDATE_TRAN_REQUEST';
export const UPDATE_TRAN_FAILURE = 'UPDATE_TRAN_FAILURE';
export const UPDATE_TRAN_SUCCESS = 'UPDATE_TRAN_SUCCESS';
export const DELETE_TRAN_REQUEST = 'DELETE_TRAN_REQUEST';
export const DELETE_TRAN_FAILURE = 'DELETE_TRAN_FAILURE';
export const DELETE_TRAN_SUCCESS = 'DELETE_TRAN_SUCCESS';
export const GET_TRAN_INFO_REQUEST = 'GET_TRAN_INFO_REQUEST';
export const GET_TRAN_INFO_FAILURE = 'GET_TRAN_INFO_FAILURE';
export const GET_TRAN_INFO_SUCCESS = 'GET_TRAN_INFO_SUCCESS';

function getTransRequest() {
  return {
    type: GET_TRANS_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function getTransFailure() {
  return {
    type: GET_TRANS_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function getTransSuccess(trans) {
  return {
    type: GET_TRANS_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    trans: trans
  };
}

function addTranRequest() {
  return {
    type: ADD_TRAN_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function addTranFailure() {
  return {
    type: ADD_TRAN_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function addTranSuccess() {
  return {
    type: ADD_TRAN_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

function updateTranRequest() {
  return {
    type: UPDATE_TRAN_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function updateTranFailure() {
  return {
    type: UPDATE_TRAN_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function updateTranSuccess(trans) {
  return {
    type: UPDATE_TRAN_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    trans: trans
  };
}

function deleteTranRequest() {
  return {
    type: DELETE_TRAN_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function deleteTranFailure() {
  return {
    type: DELETE_TRAN_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function deleteTranSuccess(trans) {
  return {
    type: DELETE_TRAN_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    trans: trans
  };
}

function getTranInfoRequest() {
  return {
    type: GET_TRAN_INFO_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function getTranInfoFailure() {
  return {
    type: GET_TRAN_INFO_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function getTranInfoSuccess(trans) {
  return {
    type: GET_TRAN_INFO_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    trans: trans
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
  return (dispatch, getState) => {
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
          // Push newly added tran to state tran list
          let trans = getState().masterReducer.trans.trans;
          let trip_id = json.result[0].trip_id;
          let e_id = json.result[0].e_id;
          if(trans[trip_id] === undefined) trans[trip_id] = {};
          trans[trip_id][e_id] = json.result[0];
          dispatch(getTranInfoSuccess(trans));
        }
      });
  };
}

/**
 * Performs an http GET trans request to server.
 * Dispatches getTrans to indicate the beginning of a getTrans process.
 * Dispatches getTransFailure to indicate the end of a failed getTrans process.
 * Dispatches getTransSuccess to indicate the end of a successful getTrans process.
 * If getTrans process succeeds, a trans object is received and passed into
 * getTransSuccess to be stored into state.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function getTrans() {
  return dispatch => {
    dispatch(getTransRequest()); // Get trans request process has begun...
    return fetch('http://localhost:4201/tran/get', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(getTransFailure());
        else {
          let trans = [];
          json.result.forEach(t => {
            if (trans[t.trip_id] === undefined) trans[t.trip_id] = {};
            trans[t.trip_id][t.e_id] = t;
          });
          dispatch(getTransSuccess(trans));
        }
      });
  };
}

/**
 * Performs an http POST addTran request to server.
 * Dispatches addTran to indicate the beginning of an addTran process.
 * Dispatches addTranFailure to indicate the end of a failed addTran process.
 * Dispatches addTranSuccess to indicate the end of a successful addTran process.
 * If addTran process succeeds, getTranInfo is dispatched using the returned
 * e_id of the newly added tran.
 * @param tran object containing email, name, and dscript.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function addTran(tran) {
  return dispatch => {
    dispatch(addTranRequest()); // Add tran request process has begun...
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
        if (json.success === false) dispatch(addTranFailure());
        else {
          dispatch(addTranSuccess());
          dispatch(getTranInfo(json.result)); // Fetch added tran
        }
      });
  };
}

/**
 * Performs an http PUT updateTran request to server.
 * Dispatches updateTran to indicate the beginning of an updateTran process.
 * Dispatches updateTranFailure to indicate the end of a failed updateTran process.
 * Dispatches updateTranSuccess to indicate the end of a successful updateTran process.
 * If updateTran process succeeds, the outdated tran is filtered out of the state list
 * and getTranInfo is dispatched using the e_id of the updated tran.
 * @param tran object containing name, dscript, e_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function updateTran(tran) {
  return (dispatch, getState) => {
    dispatch(updateTranRequest()); // Update tran request process has begun...
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
        if (json.success === false) dispatch(updateTranFailure());
        else {
          // Delete outdated tran, fetch updated tran
          let trans = getState().masterReducer.trans.trans;
          delete trans[tran.trip_id][tran.e_id];
          dispatch(updateTranSuccess());
          dispatch(getTranInfo(tran.e_id));
        }
      });
  };
}

/**
 * Performs an http DELETE deleteTran request to server.
 * Dispatches deleteTran to indicate the beginning of a deleteTran process.
 * Dispatches deleteTranFailure to indicate the end of a failed deleteTran process.
 * Dispatches deleteTranSuccess to indicate the end of a successful deleteTran process.
 * If deleteTran process succeeds, the deleted tran is filtered out of the
 * state tran list.
 * @param tran object containing name, dscript, e_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function deleteTran(tran) {
  return (dispatch, getState) => {
    dispatch(deleteTranRequest()); // Delete tran request process has begun...
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
        if (json.success === false) dispatch(deleteTranFailure());
        else {
          // Deleted tran from state tran list
          let trans = getState().masterReducer.trans.trans;
          delete trans[tran.trip_id][tran.e_id];
          dispatch(deleteTranSuccess(trans));
        }
      });
  };
}
