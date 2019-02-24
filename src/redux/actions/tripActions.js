import fetch from 'cross-fetch';

export const GET_TRIPS_REQUEST = 'GET_TRIPS_REQUEST';

export function getTrips() {
  return {
    type: GET_TRIPS_REQUEST,
    lastUpdated: Date.now(),
    isFetching: true
  }
}