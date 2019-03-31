import { convertAllDates } from './convertDate';

/**
 * Helper method that checks if events of a certain types should be
 * shown or not based on the contents of the filter.
 * @param events the array of events
 * @param eventType the type of event (as a string, plural version)
 * @param filter set with the allowed event types
 * @returns {boolean|*}
 */
function shouldShow(events, eventType, filter) {
  return (
    events != null &&
    (filter == null || filter.has(eventType) || filter.has('all'))
  );
}

/**
 * Checks if a state is not null (along with all the inner
 * pieces of the state needed to get events).
 * @param state the state of the redux store
 * @returns {boolean} whether the state is valid (true if ok)
 */
function isValid(state) {
  if (
    state == null ||
    state.plans == null ||
    state.plans.plans == null ||
    state.accoms == null ||
    state.accoms.accoms == null ||
    state.trans == null ||
    state.trans.trans == null
  ) {
    return false;
  }
  return true;
}

/**
 * Gets all events associated with a trip in the form of an array, and assigns
 * each a property called "event_type", which has a value of "plan", "accom",
 * or "trans", depending on the event's type.
 * @param state the state of the redux store.
 * @param tripId the id of the trip to get events from.
 * @param filter the filter for the events to show (optional)
 * @returns {any[]} the array of events associated with the trip.
 */
export function getTripEvents(state, tripId, filter = null) {
  // Check for nulls, just in case.
  if (!isValid(state)) return [];

  if (filter == null) filter = new Set(['all']);
  else filter = new Set(filter.split(' ')); // Get all of the filters in a set
  let plans = state.plans.plans[tripId];
  let accoms = state.accoms.accoms[tripId];
  let trans = state.trans.trans[tripId];

  // Get all the values from the dictionaries (just get the raw event objects
  // without worrying about their event ids). It only gets them if the section
  // is not null.
  if (shouldShow(plans, 'plans', filter)) {
    plans = Object.values(plans);
  } else plans = [];

  if (shouldShow(accoms, 'accoms', filter)) {
    accoms = Object.values(accoms);
  } else accoms = [];

  if (shouldShow(trans, 'trans', filter)) {
    trans = Object.values(trans);
  } else trans = [];

  // This does a deeper copy of the events than before, and it adds an extra
  // property to the event types' names.
  let events = [
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
  convertAllDates(events);
  return events;
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

/**
 * Sorts the events.
 * @param events array of events, each with a trip_start
 * and a trip_end time.
 */
function sortEvents(events) {
  events.sort((a, b) => {
    if (b.begin_time === null) return -1; // If null, b goes at end
    if (a.begin_time === null) return 1; // If null, a goes at end

    if (a.begin_time < b.begin_time) return -1;
    if (a.begin_time > b.begin_time) return 1;
    if (a.end_time < b.end_time) return -1;
    if (a.end_time > b.end_time) return 1;
    return 0;
  });
}

/**
 * This gets all of the current events and puts them in a sorted array.
 * It also gets the upcoming events in a sorted array. Each event has
 * an associated begin_time and end_time property.
 * Access the current events by using the current property.
 * @param state the state of the Redux store
 * @param tripId the id of the trip to get events for
 * @returns {{current: Array, upcoming: Array}} the first is an array of
 * current events, the second is an array of upcoming events.
 */
export function getActiveEvents(state, tripId) {
  // Check for nulls, just in case.
  if (!isValid(state)) return [];

  let currEvents = [];
  let upcomingEvents = [];

  let plans = state.plans.plans[tripId];
  let accoms = state.accoms.accoms[tripId];
  let trans = state.trans.trans[tripId];

  // Get all the values from the dictionaries (just get the raw event objects
  // without worrying about their event ids). It only gets them if the section
  // is not null.
  let events = [];
  if (plans != null) events = [...Object.values(plans)];
  if (accoms != null) events = [...events, ...Object.values(accoms)];
  if (trans != null) events = [...events, ...Object.values(trans)];
  convertAllDates(events);

  events.forEach((event) => {
    if (
      event.begin_time === null || // Then it's a planned future event
      event.begin_time > new Date() // Then it's in the future
    ) {
      // Add the active event
      upcomingEvents.push({ ...event });
    } else if (
      event.end_time > new Date() // Then it's not over yet
    ) {
      currEvents.push({ ...event });
    }

    sortEvents(currEvents);
    sortEvents(upcomingEvents);
  });

  return { current: currEvents, upcoming: upcomingEvents };
}
