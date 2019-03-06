export function getActiveTrips(state) {
  let trips = [];
  state.trips.trips.forEach(trip => {});

  // Sort all of our trips
  trips.sort((a, b) => {
    if (a.trip_start < b.trip_start) return -1;
    if (a.trip_start > b.trip_start) return 1;
    if (a.trip_end < b.trip_end) return -1;
    if (a.trip_end > b.trip_end) return 1;
    return 0;
  });

  return trips;
}
