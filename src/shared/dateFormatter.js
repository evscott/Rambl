export const formatForMysql = (d) => {
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
