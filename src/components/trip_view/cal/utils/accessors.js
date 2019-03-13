/**
 * This has accessor methods for the calendar. That is, it provides a means for
 * the calendar to access certain aspects of events by simply calling a method.
 */

import moment from 'moment';

/**
 * Accessor function that retrieves if an event is considered
 * an "all day" event or not for display on the calendar.
 * @param event the event to display (given by BigCalendar)
 * @return true if the event is longer than 24 hours
 */
export function allDayAccessor(event) {
  let start = moment(event.begin_time);
  let end = moment(event.end_time);
  let diff = end.diff(start, 'hours');
  return diff >= 24;
}
