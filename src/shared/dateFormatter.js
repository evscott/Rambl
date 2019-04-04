/**
 * Formats the date for user consumption.
 * @param d string representing the date to change.
 * Similar to '09/13/1999 5:36 PM'
 * @returns {*} String representing the date, similar
 * to '09/13/1999, 5:36 PM'
 */
export const formatDateForUser = (d) => {
  if (d === '') return 'unspecified';
  let date = new Date(d);
  date = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
  return date;
};

/**
 * Puts the date into the MySQL DateTime format.
 * @param d the string representing the date to convert.
 * @returns {string} the MySQL DateTime string format.
 */
export const formatDateForMySql = (d) => {
  let date = new Date(d);
  let mysqlDate =
    getYear(date) +
    '-' +
    getMonth(date) +
    '-' +
    getDate(date) +
    ' ' +
    getHours(date) +
    ':' +
    getMinutes(date) +
    ':' +
    getSeconds(date);
  return mysqlDate;
};

function getYear(date) {
  return date.getFullYear();
}

/**
 * Increments month up by one as JavaScript indexes months beginning at 0 -
 * i.e. April = 3.
 * @param date
 * @returns {string}
 */
function getMonth(date) {
  return ('0' + (date.getMonth() + 1)).slice(-2);
}

function getDate(date) {
  return ('0' + date.getDate()).slice(-2);
}

function getHours(date) {
  return ('0' + date.getHours()).slice(-2);
}

function getMinutes(date) {
  return ('0' + date.getMinutes()).slice(-2);
}

function getSeconds(date) {
  return ('0' + date.getSeconds()).slice(-2);
}
