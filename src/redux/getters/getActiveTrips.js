import { getTripTimes } from './getTripTimes';

/**
 * This gets all of the active trips. That is, it gathers
 * each of the trips which have events which have not yet occurred
 * (or has trips with no events that have yet occurred), assigns
 * start/end times to the trip objects based on its events, and
 * sorts them based on the start times.
 * @param state the Redux store's current state.
 * @returns {Array} array of trip objects, sorted, with start/end
 * times in fields trip_start and trip_end.
 */
export function getActiveTrips(state) {
  let trips = [];
  state.trips.trips.forEach(trip => {
    let tripTimes = getTripTimes(state, trip.trip_id);

    if (
      tripTimes.trip_start === null ||      // Then it's a planned future trip
      tripTimes.trip_start > new Date() ||  // Then it's in the future
      tripTimes.trip_end > new Date()       // Then it's not over yet
    ) {
      // Add the active trip with its calculated times
      trips.push({ ...trip, ...tripTimes });
    }
  });

  // Sort all of our trips
  trips.sort((a, b) => {
    if (b.trip_start === null) return -1;   // If null, b goes at end
    if (a.trip_start === null) return 1;    // If null, a goes at end

    if (a.trip_start < b.trip_start) return -1;
    if (a.trip_start > b.trip_start) return 1;
    if (a.trip_end < b.trip_end) return -1;
    if (a.trip_end > b.trip_end) return 1;
    return 0;
  });

  return trips;
}
