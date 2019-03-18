/**
 * Gets all events associated with a trip in the form of an array, and assigns
 * each a property called "event_type", which has a value of "plan", "accom",
 * or "trans", depending on the event's type.
 * @param state the state of the redux store.
 * @param tripId the id of the trip to get events from.
 * @returns {any[]} the array of events associated with the trip.
 */
export function getTripEvents(state, tripId) {
  let plans = state.plans.plans[tripId];
  let accoms = state.accoms.accoms[tripId];
  let trans = state.trans.trans[tripId];

  // Get all the values from the dictionaries (just get the raw event objects
  // without worrying about their event ids). It only gets them if the section
  // is not null.
  if (plans != null) plans = Object.values(plans);
  else plans = [];
  if (accoms != null) accoms = Object.values(accoms);
  else accoms = [];
  if (trans != null) trans = Object.values(trans);
  else trans = [];

  // This does a deeper copy of the events than before, and it adds an extra
  // property to the event types' names.
  return [
    ...plans.map((plan) => ({
      ...plan,
      event_type: 'plan'
    })),
    ...accoms.map((accom) => ({
      ...accom,
      event_type: 'accom'
    })),
    ...trans.map((trans) => ({
      ...trans,
      event_type: 'trans'
    }))
  ];
}

/**
 * This gets all of the plans associated with the trip ID where the
 * start time is undefined. That is, it filters the events to find
 * all of the to-dos not on the calendar.
 * @param events array of events (as from getTripEvents(state, tripId)
 * @returns {any[]} array of to-dos
 */
export function filterTripToDos(events) {
  events = events.filter((event) => {
    // keep if no start time and it's a plan type
    return event.begin_time === null;
  });
  return events;
}
