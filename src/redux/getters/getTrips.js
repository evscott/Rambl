import { getTripTimes } from './getTripTimes';

/**
 * Sorts the trips.
 * @param trips array of trips, each with a trip_start
 * and a trip_end time.
 */
function sortTrips(trips) {
  trips.sort((a, b) => {
    if (b.trip_start === null) return -1; // If null, b goes at end
    if (a.trip_start === null) return 1; // If null, a goes at end

    if (a.trip_start < b.trip_start) return -1;
    if (a.trip_start > b.trip_start) return 1;
    if (a.trip_end < b.trip_end) return -1;
    if (a.trip_end > b.trip_end) return 1;
    return 0;
  });
}

/**
 * Gets the current (or next) trip the user is on. If the user is on multiple
 * trips, it returns the trip that starts first. To break ties, it returns
 * the trip that ends first. If there are no current trips, it returns the
 * first future trip in a similar fashion. If there are no future trips, it
 * returns null.
 * Note that the return is a dictionary with two elements: current (boolean
 * representing if the trip is currently happening) and trip (the trip object).
 * @param state the state of the Redux store.
 * @returns {{current: boolean, trip: *}}
 */
export function getCurrTrip(state) {
  let currTrip = null;
  state.trips.trips.forEach((trip) => {
    let tripTimes = getTripTimes(state, trip.trip_id);

    // If the trip finishes in the future
    if (new Date() < tripTimes.trip_end) {
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
  if (currTrip == null) {
    return { current: false, trip: null };
  } else if (currTrip.trip_start < new Date()) {
    return { current: true, trip: currTrip };
  } else {
    return { current: false, trip: currTrip };
  }
}

/**
 * This gets all of the active trips (that are underway or in the future)
 * and puts them in a sorted array. It also gets the inactive trips in a
 * sorted array. Each trip has assigned start/end times based on the events
 * associated with the trip. That is, each trip has an associated trip_start
 * and trip_end property.
 * Access the active trips by using the active property.
 * @param state the state of the Redux store
 * @returns {{inactive: Array, active: Array}} the first is an array of
 * inactive trips, the second is an array of current and upcoming trips.
 */
export function getSortedTrips(state) {
  let activeTrips = [];
  let inactiveTrips = [];
  state.trips.trips.forEach((trip) => {
    let tripTimes = getTripTimes(state, trip.trip_id);

    if (
      tripTimes.trip_start === null || // Then it's a planned future trip
      tripTimes.trip_start > new Date() || // Then it's in the future
      tripTimes.trip_end > new Date() // Then it's not over yet
    ) {
      // Add the active trip with its calculated times
      activeTrips.push({ ...trip, ...tripTimes });
    } else {
      inactiveTrips.push({ ...trip, ...tripTimes });
    }
  });

  sortTrips(activeTrips);
  sortTrips(inactiveTrips);

  return { active: activeTrips, inactive: inactiveTrips };
}
