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


function getTripsRequest() {
  return {
    type: GET_TRIPS_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  }
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
  }
}

function addTripFailure() {
  return {
    type: ADD_TRIP_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false
  };
}

function addTripSuccess(trips) {
  return {
    type: ADD_TRIP_SUCCESS,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: true,
    trips: trips
  };
}

function updateTripRequest() {
  return {
    type: UPDATE_TRIP_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true,
    isSynced: false
  }
}

function updateTripFailure() {
  return {
    type: UPDATE_TRIP_FAILURE,
    lastUpdated: Date.now(),
    isFetching: false,
    isSynced: false,
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
  }
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

/**************************** Logical functions ****************************/

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
    dispatch(getTripsRequest()); // get trips request process has begun...
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
        else dispatch(getTripsSuccess(json));
      });
  };
}

/**
 * Performs an http POST addTrip request to server.
 * Dispatches addTrip to indicate the beginning of an addTrip process.
 * Dispatches addTripFailure to indicate the end of a failed addTrip process.
 * Dispatches addTripSuccess to indicate the end of a successful addTrip process.
 * If addTrip process succeeds, TODO
 * @param trip object containing email, name, and dscript.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function addTrip(trip) {
  return dispatch => {
    dispatch(addTripRequest()); // add trip request process has begun...
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
          // TODO
          //dispatch(addTripSuccess(trip));
        }
      });
  };
}

/**
 * Performs an http PUT updateTrip request to server.
 * Dispatches updateTrip to indicate the beginning of an updateTrip process.
 * Dispatches updateTripFailure to indicate the end of a failed updateTrip process.
 * Dispatches updateTripSuccess to indicate the end of a successful updateTrip process.
 * If updateTrip process succeeds, TODO
 * @param trip object containing name, dscript, trip_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function updateTrip(trip) {
  return dispatch => {
    dispatch(updateTripRequest()); // update trip request process has begun...
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
          // TODO
          //dispatch(updateTripSuccess(trip));
        }
      });
  };
}

/**
 * Performs an http DELETE updateTrip request to server.
 * Dispatches updateTrip to indicate the beginning of an updateTrip process.
 * Dispatches updateTripFailure to indicate the end of a failed updateTrip process.
 * Dispatches updateTripSuccess to indicate the end of a successful updateTrip process.
 * If updateTrip process succeeds, TODO
 * @param trip object containing name, dscript, trip_id.
 * @returns {function(*): Promise<Response | never>} dispatch results.
 */
export function deleteTrip(trip) {
  return dispatch => {
    dispatch(deleteTripRequest()); // delete trip request process has begun...
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
          // TODO
          //dispatch(deleteTripSuccess(trip));
        }
      });
  };
}