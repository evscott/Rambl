/**
 * This converts a date object received from the database (represented
 * as a string) into a javascript Date object, which is more versatile.
 * @param dateString string representing the date/time, received from db.
 * @returns {Date} Date object representing the date from the string.
 */
export function convertDate(dateString) {
  if (dateString == null) return null;
  // This gets an array [ year, month, day, hour, minute, second, millisecond ]
  let date = dateString.split(/[- :.TZ]/);
  return new Date(
    Date.UTC(date[0], date[1] - 1, date[2], date[3], date[4], date[5])
  );
}
