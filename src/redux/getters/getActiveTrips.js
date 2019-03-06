import { getTripTimes } from './getTripTimes';

/**
 * Sorts the trips.
 * @param trips array of trips, each with a trip_start
 * and a trip_end time.
 */
function sortTrips(trips) {
  trips.sort((a, b) => {
    if (b.trip_start === null) return -1;   // If null, b goes at end
    if (a.trip_start === null) return 1;    // If null, a goes at end

    if (a.trip_start < b.trip_start) return -1;
    if (a.trip_start > b.trip_start) return 1;
    if (a.trip_end < b.trip_end) return -1;
    if (a.trip_end > b.trip_end) return 1;
    return 0;
  });
}

/**
 * Gets the current trip that the user is on. If the user is on multiple
 * trips, it returns the trip that starts first. To break ties, it returns
 * the trip that ends first. If there are no current trips, it returns null.
 * @param state the Redux state.
 * @returns {*} the current trip.
 */
export function getCurrTrip(state) {
  let currTrip = null;
  state.trips.trips.forEach(trip => {
    let tripTimes = getTripTimes(state, trip.trip_id);

    // If the trip is currently underway
    if (tripTimes.trip_start < new Date() && new Date() < tripTimes.trip_end) {
      if (currTrip == null) {
        // Then we found our current trip
        currTrip = { ...trip, ...tripTimes };
      } else {
        // We need to check which trip should be the featured current trip
        if (tripTimes.trip_start < currTrip.trip_start) {
          // Check if this trip started earlier
          currTrip = { ...trip, ...tripTimes };
        } else if (
          tripTimes.trip_start === currTrip.trip_start &&
          tripTimes.trip_end < currTrip.trip_end
        ) {
          // Check if this trip ends earlier
          currTrip = { ...trip, ...tripTimes };
        }
      }
    }
  });
  return currTrip;
}

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
  state.trips.trips.forEach((trip) => {
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

  sortTrips(trips);

  return trips;
}
