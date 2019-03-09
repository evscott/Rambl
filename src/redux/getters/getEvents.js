export function getTripEvents(state, tripId) {
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
  return events;
}
