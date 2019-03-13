/**
 * These are date conversion methods, useful for transforming events
 * when they are pulled into the state.
 * Things they do not do (right now):
 * - convert the date for check in (with accommodations)
 *
 * This should be called on all events brought into the store to avoid
 * any duplication.
 */

/**
 * This converts a date object received from the database (represented
 * as a string) into a javascript Date object, which is more versatile.
 * @param dateString string representing the date/time, received from db.
 * @returns {Date} Date object representing the date from the string.
 */
export function convertDate(dateString) {
  if (dateString == null) return null;
  if (dateString instanceof Date) return dateString; // Already converted.
  // This gets an array [ year, month, day, hour, minute, second, millisecond ]
  let date = dateString.split(/[- :.TZ]/);
  return new Date(
    Date.UTC(date[0], date[1] - 1, date[2], date[3], date[4], date[5])
  );
}

/**
 * This converts the dates of all event objects passed in (as an array)
 * into Date objects, which are more useful for displaying in a calendar.
 * @param events array of event objects.
 * @return the events array (again)
 */
export function convertAllDates(events) {
  events.forEach((event) => {
    // Change the begin_time and end_time into a date object
    event.begin_time = convertDate(event.begin_time);
    event.end_time = convertDate(event.end_time);
  });
  return events;
}

/**
 * This converts the dates of the single event object passed in to make
 * it a Javascript Date object which is easily displayable.
 * @param event the event object with dates to convert
 * @returns the event (again)
 */
export function convertDates(event) {
  event.begin_time = convertDate(event.begin_time);
  event.end_time = convertDate(event.end_time);
  return event;
}
