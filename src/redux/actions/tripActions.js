import fetch from 'cross-fetch';

export const GET_TRIPS_REQUEST = 'GET_TRIPS_REQUEST';
export const GET_TRIPS_FAILURE = 'GET_TRIPS_FAILURE';
export const GET_TRIPS_SUCCESS = 'GET_TRIPS_SUCCESS';
export const ADD_TRIP_REQUEST = 'ADD_TRIP_REQUEST';
export const ADD_TRIP_FAILURE = 'ADD_TRIP_FAILURE';
export const ADD_TRIP_SUCCESS = 'ADD_TRIP_SUCCESS';
export const UPDATE_TRIP_REQUEST = 'UPDATE_TRIP_REQUEST';
export const UPDATE_TRIP_FAILURE = 'UPDATE_TRIP_FAILURE';
export const UPDATE_TRIP_SUCCESS = 'UPDATE_TRIP_SUCCESS';
export const DELETE_TRIP_REQUEST = 'DELETE_TRIP_REQUEST';
export const DELETE_TRIP_FAILURE = 'DELETE_TRIP_FAILURE';
export const DELETE_TRIP_SUCCESS = 'DELETE_TRIP_SUCCESS';
export const GET_TRIP_INFO_REQUEST = 'GET_TRIP_INFO_REQUEST';
export const GET_TRIP_INFO_FAILURE = 'GET_TRIP_INFO_FAILURE';
export const GET_TRIP_INFO_SUCCESS = 'GET_TRIP_INFO_SUCCESS';

function getTripsRequest() {
  return {
    type: GET_TRIPS_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function getTripsFailure() {
  return {
    type: GET_TRIPS_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function getTripsSuccess(trips) {
  return {
    type: GET_TRIPS_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    trips: trips
  };
}

function addTripRequest() {
  return {
    type: ADD_TRIP_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function addTripFailure() {
  return {
    type: ADD_TRIP_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function addTripSuccess() {
  return {
    type: ADD_TRIP_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

function updateTripRequest() {
  return {
    type: UPDATE_TRIP_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function updateTripFailure() {
  return {
    type: UPDATE_TRIP_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function updateTripSuccess(trips) {
  return {
    type: UPDATE_TRIP_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    trips: trips
  };
}

function deleteTripRequest() {
  return {
    type: DELETE_TRIP_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function deleteTripFailure() {
  return {
    type: DELETE_TRIP_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function deleteTripSuccess(trips) {
  return {
    type: DELETE_TRIP_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    trips: trips
  };
}

function getTripInfoRequest() {
  return {
    type: GET_TRIP_INFO_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  };
}

function getTripInfoFailure() {
  return {
    type: GET_TRIP_INFO_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function getTripInfoSuccess() {
  return {
    type: GET_TRIP_INFO_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true
  };
}

/**************************** Logical functions ****************************/

/**
 * Performs an http POST get trip info request to server.
 * Dispatches getUserInfoRequest to indicate the beginning of a getTripInfo process.
 * Dispatches getTripInfoFailure to indicate the end of a failed getTripInfo process.
 * Dispatches getTripSuccess to indicate the end of a successful getTripInfo process.
 * If getTripInfo process succeeds, a trip list object is received and passed into
 * getTripInfoSuccess to be stored into state.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
function getTripInfo(trip_id) {
  return (dispatch, getState) => {
    dispatch(getTripInfoRequest());
    return fetch('http://localhost:4201/trip/get', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'post',
      body: JSON.stringify({ trip_id: trip_id })
    })
      .then(response => response.json())
      .then(json => {
        if (json.length === 0) dispatch(getTripInfoFailure());
        else {
          // Push newly added trip to state trip list
          let trips = getState().masterReducer.trips.trips;
          trips.push(json.result[0]);
          dispatch(getTripInfoSuccess(trips));
        }
      });
  };
}

/**
 * Performs an http GET trips request to server.
 * Dispatches getTrips to indicate the beginning of a getTrips process.
 * Dispatches getTripsFailure to indicate the end of a failed getTrips process.
 * Dispatches getTripsSuccess to indicate the end of a successful getTrips process.
 * If getTrips process succeeds, a trips object is received and passed into
 * getTripsSuccess to be stored into state.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function getTrips() {
  return dispatch => {
    dispatch(getTripsRequest()); // Get trips request process has begun...
    return fetch('http://localhost:4201/trip/get', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(getTripsFailure());
        else dispatch(getTripsSuccess(json.result));
      });
  };
}

/**
 * Performs an http POST addTrip request to server.
 * Dispatches addTrip to indicate the beginning of an addTrip process.
 * Dispatches addTripFailure to indicate the end of a failed addTrip process.
 * Dispatches addTripSuccess to indicate the end of a successful addTrip process.
 * If addTrip process succeeds, getTripInfo is dispatched using the returned
 * trip_id of the newly added trip.
 * @param trip object containing email, name, and dscript.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function addTrip(trip) {
  return dispatch => {
    dispatch(addTripRequest()); // Add trip request process has begun...
    console.log(trip);
    return fetch('http://localhost:4201/trip/add', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'POST',
      body: JSON.stringify(trip)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(addTripFailure());
        else {
          dispatch(addTripSuccess());
          dispatch(getTripInfo(json.result)); // Fetch updated trip
        }
      });
  };
}

/**
 * Performs an http PUT updateTrip request to server.
 * Dispatches updateTrip to indicate the beginning of an updateTrip process.
 * Dispatches updateTripFailure to indicate the end of a failed updateTrip process.
 * Dispatches updateTripSuccess to indicate the end of a successful updateTrip process.
 * If updateTrip process succeeds, the outdated trip is filtered out of the state list
 * and getTripInfo is dispatched using the trip_id of the updated trip.
 * @param trip object containing name, dscript, trip_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function updateTrip(trip) {
  return (dispatch, getState) => {
    dispatch(updateTripRequest()); // Update trip request process has begun...
    return fetch('http://localhost:4201/trip/update', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'PUT',
      body: JSON.stringify(trip)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(updateTripFailure());
        else {
          // Filter out outdated trip, fetch updated trip
          let trips = getState().masterReducer.trips.trips;
          trip = trips.filter(t => t.trip_id !== trip.trip_id);
          dispatch(updateTripSuccess());
          dispatch(getTripInfo(trip.trip_id));
        }
      });
  };
}

/**
 * Performs an http DELETE updateTrip request to server.
 * Dispatches deleteTrip to indicate the beginning of an deleteTrip process.
 * Dispatches deleteTripFailure to indicate the end of a failed deleteTrip process.
 * Dispatches deleteTripSuccess to indicate the end of a successful deleteTrip process.
 * If deleteTrip process succeeds, the deleted trip is filtered out of the
 * state trip list.
 * @param trip object containing name, dscript, trip_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function deleteTrip(trip) {
  return (dispatch, getState) => {
    dispatch(deleteTripRequest()); // Delete trip request process has begun...
    return fetch('http://localhost:4201/trip/delete', {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      method: 'DELETE',
      body: JSON.stringify(trip)
    })
      .then(response => response.json())
      .then(json => {
        if (json.success === false) dispatch(deleteTripFailure());
        else {
          // Filter out deleted trip from state trip list
          let trips = getState().masterReducer.trips.trips;
          trips = trips.filter(t => t.trip_id !== trip.trip_id);
          dispatch(deleteTripSuccess(trips));
        }
      });
  };
}
