import fetch from 'cross-fetch';

export const GET_PLANS_REQUEST = 'GET_PLANS_REQUEST';
export const GET_PLANS_FAILURE = 'GET_PLANS_FAILURE';
export const GET_PLANS_SUCCESS = 'GET_PLANS_SUCCESS';
export const ADD_PLAN_REQUEST = 'ADD_PLAN_REQUEST';
export const ADD_PLAN_FAILURE = 'ADD_PLAN_FAILURE';
export const ADD_PLAN_SUCCESS = 'ADD_PLAN_SUCCESS';
export const UPDATE_PLAN_REQUEST = 'UPDATE_PLAN_REQUEST';
export const UPDATE_PLAN_FAILURE = 'UPDATE_PLAN_FAILURE';
export const UPDATE_PLAN_SUCCESS = 'UPDATE_PLAN_SUCCESS';
export const DELETE_PLAN_REQUEST = 'DELETE_PLAN_REQUEST';
export const DELETE_PLAN_FAILURE = 'DELETE_PLAN_FAILURE';
export const DELETE_PLAN_SUCCESS = 'DELETE_PLAN_SUCCESS';
export const GET_PLAN_INFO_REQUEST = 'GET_PLAN_INFO_REQUEST';
export const GET_PLAN_INFO_FAILURE = 'GET_PLAN_INFO_FAILURE';
export const GET_PLAN_INFO_SUCCESS = 'GET_PLAN_INFO_SUCCESS';

function getPlansRequest() {
  return {
    type: GET_PLANS_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function getPlansFailure() {
  return {
    type: GET_PLANS_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function getPlansSuccess(plans) {
  return {
    type: GET_PLANS_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    plans: plans
  };
}

function addPlanRequest() {
  return {
    type: ADD_PLAN_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function addPlanFailure() {
  return {
    type: ADD_PLAN_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function addPlanSuccess() {
  return {
    type: ADD_PLAN_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

function updatePlanRequest() {
  return {
    type: UPDATE_PLAN_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function updatePlanFailure() {
  return {
    type: UPDATE_PLAN_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function updatePlanSuccess(plans) {
  return {
    type: UPDATE_PLAN_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    plans: plans
  };
}

function deletePlanRequest() {
  return {
    type: DELETE_PLAN_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function deletePlanFailure() {
  return {
    type: DELETE_PLAN_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function deletePlanSuccess(plans) {
  return {
    type: DELETE_PLAN_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    plans: plans
  };
}

function getPlanInfoRequest() {
  return {
    type: GET_PLAN_INFO_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function getPlanInfoFailure() {
  return {
    type: GET_PLAN_INFO_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function getPlanInfoSuccess(plans) {
  return {
    type: GET_PLAN_INFO_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    plans: plans
  };
}

/**************************** Logical functions ****************************/

/**
 * Performs an http POST get plan info request to server.
 * Dispatches getUserInfoRequest to indicate the beginning of a getPlanInfo process.
 * Dispatches getPlanInfoFailure to indicate the end of a failed getPlanInfo process.
 * Dispatches getPlanSuccess to indicate the end of a successful getPlanInfo process.
 * If getPlanInfo process succeeds, a plan list object is received and passed into
 * getPlanInfoSuccess to be stored into state.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
function getPlanInfo(e_id) {
  return (dispatch, getState) => {
    dispatch(getPlanInfoRequest());
    return fetch('http://localhost:4201/plan/get', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'post',
      body: JSON.stringify({ e_id: e_id })
    })
      .then(response => response.json())
      .then(json => {
        if (json.length === 0) dispatch(getPlanInfoFailure());
        else {
          // Push newly added plan to state plan list
          let plans = getState().masterReducer.plans.plans;
          let trip_id = json.result[0].trip_id;
          let e_id = json.result[0].e_id;
          if(plans[trip_id] === undefined) plans[trip_id] = {};
          plans[trip_id][e_id] = json.result[0];
          dispatch(getPlanInfoSuccess(plans));
        }
      });
  };
}

/**
 * Performs an http GET plans request to server.
 * Dispatches getPlans to indicate the beginning of a getPlans process.
 * Dispatches getPlansFailure to indicate the end of a failed getPlans process.
 * Dispatches getPlansSuccess to indicate the end of a successful getPlans process.
 * If getPlans process succeeds, a plans object is received and passed into
 * getPlansSuccess to be stored into state.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function getPlans() {
  return dispatch => {
    dispatch(getPlansRequest()); // Get plans request process has begun...
    return fetch('http://localhost:4201/plan/get', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(getPlansFailure());
        else {
          let plans = [];
          json.result.forEach(t => {
            if (plans[t.trip_id] === undefined) plans[t.trip_id] = {};
            plans[t.trip_id][t.e_id] = t;
          });
          dispatch(getPlansSuccess(plans));
        }
      });
  };
}

/**
 * Performs an http POST addPlan request to server.
 * Dispatches addPlan to indicate the beginning of an addPlan process.
 * Dispatches addPlanFailure to indicate the end of a failed addPlan process.
 * Dispatches addPlanSuccess to indicate the end of a successful addPlan process.
 * If addPlan process succeeds, getPlanInfo is dispatched using the returned
 * e_id of the newly added plan.
 * @param plan object containing email, name, and dscript.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function addPlan(plan) {
  return dispatch => {
    dispatch(addPlanRequest()); // Add plan request process has begun...
    return fetch('http://localhost:4201/plan/add', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'POST',
      body: JSON.stringify(plan)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(addPlanFailure());
        else {
          dispatch(addPlanSuccess());
          dispatch(getPlanInfo(json.result)); // Fetch added plan
        }
      });
  };
}

/**
 * Performs an http PUT updatePlan request to server.
 * Dispatches updatePlan to indicate the beginning of an updatePlan process.
 * Dispatches updatePlanFailure to indicate the end of a failed updatePlan process.
 * Dispatches updatePlanSuccess to indicate the end of a successful updatePlan process.
 * If updatePlan process succeeds, the outdated plan is filtered out of the state list
 * and getPlanInfo is dispatched using the e_id of the updated plan.
 * @param plan object containing name, dscript, e_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function updatePlan(plan) {
  return (dispatch, getState) => {
    dispatch(updatePlanRequest()); // Update plan request process has begun...
    return fetch('http://localhost:4201/plan/update', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'PUT',
      body: JSON.stringify(plan)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(updatePlanFailure());
        else {
          // Delete outdated plan, fetch updated plan
          let plans = getState().masterReducer.plans.plans;
          delete plans[plan.trip_id][plan.e_id];
          dispatch(updatePlanSuccess());
          dispatch(getPlanInfo(plan.e_id));
        }
      });
  };
}

/**
 * Performs an http DELETE deletePlan request to server.
 * Dispatches deletePlan to indicate the beginning of a deletePlan process.
 * Dispatches deletePlanFailure to indicate the end of a failed deletePlan process.
 * Dispatches deletePlanSuccess to indicate the end of a successful deletePlan process.
 * If deletePlan process succeeds, the deleted plan is filtered out of the
 * state plan list.
 * @param plan object containing name, dscript, e_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function deletePlan(plan) {
  return (dispatch, getState) => {
    dispatch(deletePlanRequest()); // Delete plan request process has begun...
    return fetch('http://localhost:4201/plan/delete', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'DELETE',
      body: JSON.stringify(plan)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(deletePlanFailure());
        else {
          // Deleted plan from state plan list
          let plans = getState().masterReducer.plans.plans;
          delete plans[plan.trip_id][plan.e_id];
          dispatch(deletePlanSuccess(plans));
        }
      });
  };
}