import fetch from 'cross-fetch';
import { hostUrl } from '../../Config';

export const GET_TRIPS_FROM_DB_REQUEST = 'GET_TRIPS_FROM_DB_REQUEST';
export const GET_TRIPS_FROM_DB_FAILURE = 'GET_TRIPS_FROM_DB_FAILURE';
export const GET_TRIPS_FROM_DB_SUCCESS = 'GET_TRIPS_FROM_DB_SUCCESS';
export const ADD_TRIP_TO_DB_REQUEST = 'ADD_TRIP_TO_DB_REQUEST';
export const ADD_TRIP_TO_DB_FAILURE = 'ADD_TRIP_TO_DB_FAILURE';
export const ADD_TRIP_TO_DB_SUCCESS = 'ADD_TRIP_TO_DB_SUCCESS';
export const ADD_TRIP_TO_STATE = 'ADD_TRIP_TO_STATE';
export const UPDATE_TRIP_IN_DB_REQUEST = 'UPDATE_TRIP_IN_DB_REQUEST';
export const UPDATE_TRIP_IN_DB_FAILURE = 'UPDATE_TRIP_IN_DB_FAILURE';
export const UPDATE_TRIP_IN_DB_SUCCESS = 'UPDATE_TRIP_IN_DB_SUCCESS';
export const DELETE_TRIP_IN_DB_REQUEST = 'DELETE_TRIP_IN_DB_REQUEST';
export const DELETE_TRIP_IN_DB_FAILURE = 'DELETE_TRIP_IN_DB_FAILURE';
export const DELETE_TRIP_IN_DB_SUCCESS = 'DELETE_TRIP_IN_DB_SUCCESS';
export const DELETE_TRIP_IN_STATE = 'DELETE_TRIP_IN_STATE';
export const GET_TRIP_INFO_FROM_DB_REQUEST = 'GET_TRIP_INFO_FROM_DB_REQUEST';
export const GET_TRIP_INFO_FROM_DB_FAILURE = 'GET_TRIP_INFO_FROM_DB_FAILURE';
export const GET_TRIP_INFO_FROM_DB_SUCCESS = 'GET_TRIP_INFO_FROM_DB_SUCCESS';

function getTripsFromDbRequest() {
  return {
    type: GET_TRIPS_FROM_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function getTripsFromDbFailure() {
  return {
    type: GET_TRIPS_FROM_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function getTripsFromDbSuccess(trips) {
  return {
    type: GET_TRIPS_FROM_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    trips: trips
  };
}

function addTripToDbRequest() {
  return {
    type: ADD_TRIP_TO_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function addTripToDbFailure() {
  return {
    type: ADD_TRIP_TO_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function addTripToDbSuccess() {
  return {
    type: ADD_TRIP_TO_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

function addTripToState(tripToAdd) {
  return {
    type: ADD_TRIP_TO_STATE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    tripToAdd: tripToAdd
  };
}

function updateTripInDbRequest() {
  return {
    type: UPDATE_TRIP_IN_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function updateTripInDbFailure() {
  return {
    type: UPDATE_TRIP_IN_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function updateTripInDbSuccess(trips) {
  return {
    type: UPDATE_TRIP_IN_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    trips: trips
  };
}

function deleteTripInDbRequest() {
  return {
    type: DELETE_TRIP_IN_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function deleteTripInDbFailure() {
  return {
    type: DELETE_TRIP_IN_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function deleteTripInDbSuccess() {
  return {
    type: DELETE_TRIP_IN_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

function deleteTripInState(tripToDelete) {
  return {
    type: DELETE_TRIP_IN_STATE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    tripToDelete: tripToDelete
  };
}

function getTripInfoFromDbRequest() {
  return {
    type: GET_TRIP_INFO_FROM_DB_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function getTripInfoFromDbFailure() {
  return {
    type: GET_TRIP_INFO_FROM_DB_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function getTripInfoFromDbSuccess() {
  return {
    type: GET_TRIP_INFO_FROM_DB_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

/**************************** Logical functions ****************************/

/**
 * Performs a dynamic http GET trip info request to server.
 * Dispatches getUserInfoRequest to indicate the beginning of a getTripInfoFromDb process.
 * Dispatches getTripInfoFromDbFailure to indicate the end of a failed getTripInfoFromDb process.
 * Dispatches getTripSuccess to indicate the end of a successful getTripInfoFromDb process.
 * If getTripInfoFromDb process succeeds, a trip list object is received and passed into
 * getTripInfoFromDbSuccess to be stored into state.
 * @param trip_id of the trip to fetch from the database.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
function getTripInfoFromDb(trip_id) {
  return dispatch => {
    dispatch(getTripInfoFromDbRequest());
    return fetch(`http://localhost:4201/trip/get/${trip_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'get'
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(getTripInfoFromDbFailure());
        else {
          dispatch(getTripInfoFromDbSuccess());
          dispatch(addTripToState(json.result[0]));
        }
      });
  };
}

/**
 * Performs an http GET trips request to server.
 * Dispatches getTripsFromDb to indicate the beginning of a getTripsFromDb process.
 * Dispatches getTripsFromDbFailure to indicate the end of a failed getTripsFromDb process.
 * Dispatches getTripsFromDbSuccess to indicate the end of a successful getTripsFromDb process.
 * If getTripsFromDb process succeeds, a trips object is received and passed into
 * getTripsFromDbSuccess to be stored into state.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function getTripsFromDb() {
  return dispatch => {
    dispatch(getTripsFromDbRequest()); // Get trips request process has begun...
    return fetch(hostUrl+':4201/trip/get', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(getTripsFromDbFailure());
        else dispatch(getTripsFromDbSuccess(json.result));
      });
  };
}

/**
 * Performs an http POST addTripToDb request to server.
 * Dispatches addTripToDb to indicate the beginning of an addTripToDb process.
 * Dispatches addTripToDbFailure to indicate the end of a failed addTripToDb process.
 * Dispatches addTripToDbSuccess to indicate the end of a successful addTripToDb process.
 * If addTripToDb process succeeds, getTripInfoFromDb is dispatched using the returned
 * trip_id of the newly added trip.
 * @param trip object containing email, name, and dscript.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function addTripToDb(trip) {
  return dispatch => {
    dispatch(addTripToDbRequest()); // Add trip request process has begun...
    console.log(trip);
    return fetch(hostUrl+':4201/trip/add', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'POST',
      body: JSON.stringify(trip)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(addTripToDbFailure());
        else {
          dispatch(addTripToDbSuccess());
          dispatch(getTripInfoFromDb(json.result)); // Fetch updated trip
        }
      });
  };
}

/**
 * Performs an http PUT updateTripInDb request to server.
 * Dispatches updateTripInDb to indicate the beginning of an updateTripInDb process.
 * Dispatches updateTripInDbFailure to indicate the end of a failed updateTripInDb process.
 * Dispatches updateTripInDbSuccess to indicate the end of a successful updateTripInDb process.
 * If updateTripInDb process succeeds, the outdated trip is filtered out of the state list
 * and getTripInfoFromDb is dispatched using the trip_id of the updated trip.
 * @param trip object containing name, dscript, trip_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function updateTripInDb(trip) {
  return dispatch => {
    dispatch(updateTripInDbRequest()); // Update trip request process has begun...
    return fetch(hostUrl+':4201/trip/update', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'PUT',
      body: JSON.stringify(trip)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(updateTripInDbFailure());
        else {
          dispatch(updateTripInDbSuccess());
          dispatch(getTripInfoFromDb(trip.trip_id));
        }
      });
  };
}

/**
 * Performs an http DELETE deleteTripInDb request to server.
 * Dispatches deleteTripInDb to indicate the beginning of a deleteTripInDb process.
 * Dispatches deleteTripInDbFailure to indicate the end of a failed deleteTripInDb process.
 * Dispatches deleteTripInDbSuccess to indicate the end of a successful deleteTripInDb process.
 * If deleteTripInDb process succeeds, the deleted trip is filtered out of the
 * state trip list.
 * @param trip object containing name, dscript, trip_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function deleteTripInDb(trip) {
  return dispatch => {
    dispatch(deleteTripInDbRequest()); // Delete trip request process has begun...
    return fetch(hostUrl+':4201/trip/delete', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'DELETE',
      body: JSON.stringify(trip)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(deleteTripInDbFailure());
        else {
          dispatch(deleteTripInDbSuccess());
          dispatch(deleteTripInState(trip));
        }
      });
  };
}
