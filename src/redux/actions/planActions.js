import fetch from 'cross-fetch';

export const GET_PLANS_FROM_DB_REQUEST = 'GET_PLANS_FROM_DB_REQUEST';
export const GET_PLANS_FROM_DB_FAILURE = 'GET_PLANS_FROM_DB_FAILURE';
export const GET_PLANS_FROM_DB_SUCCESS = 'GET_PLANS_FROM_DB_SUCCESS';
export const ADD_PLAN_TO_DB_REQUEST = 'ADD_PLAN_TO_DB_REQUEST';
export const ADD_PLAN_TO_DB_FAILURE = 'ADD_PLAN_TO_DB_FAILURE';
export const ADD_PLAN_TO_DB_SUCCESS = 'ADD_PLAN_TO_DB_SUCCESS';
export const ADD_PLAN_TO_STATE = 'ADD_PLAN_TO_STATE';
export const UPDATE_PLAN_IN_DB_REQUEST = 'UPDATE_PLAN_IN_DB_REQUEST';
export const UPDATE_PLAN_IN_DB_FAILURE = 'UPDATE_PLAN_IN_DB_FAILURE';
export const UPDATE_PLAN_IN_DB_SUCCESS = 'UPDATE_PLAN_IN_DB_SUCCESS';
export const DELETE_PLAN_IN_DB_REQUEST = 'DELETE_PLAN_IN_DB_REQUEST';
export const DELETE_PLAN_IN_DB_FAILURE = 'DELETE_PLAN_IN_DB_FAILURE';
export const DELETE_PLAN_IN_DB_SUCCESS = 'DELETE_PLAN_IN_DB_SUCCESS';
export const DELETE_PLAN_IN_STATE = 'DELETE_PLAN_IN_STATE';
export const GET_PLAN_INFO_FROM_DB_REQUEST = 'GET_PLAN_INFO_FROM_DB_REQUEST';
export const GET_PLAN_INFO_FROM_DB_FAILURE = 'GET_PLAN_INFO_FROM_DB_FAILURE';
export const GET_PLAN_INFO_FROM_DB_SUCCESS = 'GET_PLAN_INFO_FROM_DB_SUCCESS';

function getPlansFromDbRequest() {
  return {
    type: GET_PLANS_FROM_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function getPlansFromDbFailure() {
  return {
    type: GET_PLANS_FROM_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function getPlansFromDbSuccess(plans) {
  return {
    type: GET_PLANS_FROM_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    plans: plans
  };
}

function addPlanToDbRequest() {
  return {
    type: ADD_PLAN_TO_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function addPlanToDbFailure() {
  return {
    type: ADD_PLAN_TO_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function addPlanToDbSuccess() {
  return {
    type: ADD_PLAN_TO_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

function addPlanToState(planToAdd) {
  return {
    type: ADD_PLAN_TO_STATE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    planToAdd: planToAdd
  };
}

function updatePlanInDbRequest() {
  return {
    type: UPDATE_PLAN_IN_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function updatePlanInDbFailure() {
  return {
    type: UPDATE_PLAN_IN_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function updatePlanInDbSuccess(plans) {
  return {
    type: UPDATE_PLAN_IN_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    plans: plans
  };
}

function deletePlanInDbRequest() {
  return {
    type: DELETE_PLAN_IN_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function deletePlanInDbFailure() {
  return {
    type: DELETE_PLAN_IN_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function deletePlanInDbSuccess() {
  return {
    type: DELETE_PLAN_IN_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

function deletePlanInState(planToDelete) {
  return {
    type: DELETE_PLAN_IN_STATE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    planToDelete: planToDelete
  };
}

function getPlanInfoFromDbRequest() {
  return {
    type: GET_PLAN_INFO_FROM_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function getPlanInfoFromDbFailure() {
  return {
    type: GET_PLAN_INFO_FROM_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function getPlanInfoFromDbSuccess() {
  return {
    type: GET_PLAN_INFO_FROM_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

/**************************** Logical functions ****************************/

/**
 * Performs a dynamic http GET plan info request to server.
 * Dispatches getUserInfoRequest to indicate the beginning of a getPlanInfoFromDb process.
 * Dispatches getPlanInfoFromDbFailure to indicate the end of a failed getPlanInfoFromDb process.
 * Dispatches getPlanSuccess to indicate the end of a successful getPlanInfoFromDb process.
 * If getPlanInfoFromDb process succeeds, a plan list object is received and passed into
 * getPlanInfoFromDbSuccess to be stored into state.
 * @param e_id of plan to fetch from database.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
function getPlanInfoFromDb(e_id) {
  return (dispatch) => {
    dispatch(getPlanInfoFromDbRequest());
    return fetch(`http://localhost:4201/plan/get/${e_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'get'
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.length === 0) dispatch(getPlanInfoFromDbFailure());
        else {
          dispatch(getPlanInfoFromDbSuccess());
          dispatch(addPlanToState(json.result[0]));
        }
      });
  };
}

/**
 * Performs an http GET plans request to server.
 * Dispatches getPlansFromDb to indicate the beginning of a getPlansFromDb process.
 * Dispatches getPlansFromDbFailure to indicate the end of a failed getPlansFromDb process.
 * Dispatches getPlansFromDbSuccess to indicate the end of a successful getPlansFromDb process.
 * If getPlansFromDb process succeeds, a plans object is received and passed into
 * getPlansFromDbSuccess to be stored into state.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function getPlansFromDb() {
  return (dispatch) => {
    dispatch(getPlansFromDbRequest()); // Get plans request process has begun...
    return fetch('http://localhost:4201/plan/get', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'GET'
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success === false) dispatch(getPlansFromDbFailure());
        else {
          let plans = [];
          json.result.forEach((t) => {
            if (plans[t.trip_id] === undefined) plans[t.trip_id] = {};
            plans[t.trip_id][t.e_id] = t;
          });
          dispatch(getPlansFromDbSuccess(plans));
        }
      });
  };
}

/**
 * Performs an http POST addPlanToDb request to server.
 * Dispatches addPlanToDb to indicate the beginning of an addPlanToDb process.
 * Dispatches addPlanToDbFailure to indicate the end of a failed addPlanToDb process.
 * Dispatches addPlanToDbSuccess to indicate the end of a successful addPlanToDb process.
 * If addPlanToDb process succeeds, getPlanInfoFromDb is dispatched using the returned
 * e_id of the newly added plan.
 * @param plan object containing email, name, and dscript.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function addPlanToDb(plan) {
  return (dispatch) => {
    dispatch(addPlanToDbRequest()); // Add plan request process has begun...
    return fetch('http://localhost:4201/plan/add', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'POST',
      body: JSON.stringify(plan)
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success === false) dispatch(addPlanToDbFailure());
        else {
          dispatch(addPlanToDbSuccess());
          dispatch(getPlanInfoFromDb(json.result));
        }
      });
  };
}

/**
 * Performs an http PUT updatePlanInDb request to server.
 * Dispatches updatePlanInDb to indicate the beginning of an updatePlanInDb process.
 * Dispatches updatePlanInDbFailure to indicate the end of a failed updatePlanInDb process.
 * Dispatches updatePlanInDbSuccess to indicate the end of a successful updatePlanInDb process.
 * If updatePlanInDb process succeeds, the outdated plan is filtered out of the state list
 * and getPlanInfoFromDb is dispatched using the e_id of the updated plan.
 * @param plan object containing name, dscript, e_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function updatePlanInDb(plan) {
  return (dispatch) => {
    dispatch(updatePlanInDbRequest()); // Update plan request process has begun...
    return fetch('http://localhost:4201/plan/update', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'PUT',
      body: JSON.stringify(plan)
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success === false) dispatch(updatePlanInDbFailure());
        else {
          dispatch(updatePlanInDbSuccess());
          dispatch(getPlanInfoFromDb(plan.e_id));
        }
      });
  };
}

/**
 * Performs an http DELETE deletePlanInDb request to server.
 * Dispatches deletePlanInDb to indicate the beginning of a deletePlanInDb process.
 * Dispatches deletePlanInDbFailure to indicate the end of a failed deletePlanInDb process.
 * Dispatches deletePlanInDbSuccess to indicate the end of a successful deletePlanInDb process.
 * If deletePlanInDb process succeeds, the deleted plan is filtered out of the
 * state plan list.
 * @param plan object containing name, dscript, e_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function deletePlanInDb(plan) {
  return (dispatch) => {
    dispatch(deletePlanInDbRequest()); // Delete plan request process has begun...
    return fetch('http://localhost:4201/plan/delete', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'DELETE',
      body: JSON.stringify(plan)
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success === false) dispatch(deletePlanInDbFailure());
        else {
          dispatch(deletePlanInDbSuccess());
          dispatch(deletePlanInState(plan));
        }
      });
  };
}
