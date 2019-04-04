import { formatDateForUser, formatDateForMySql } from '../dateFormatter';

it('Date formatter works for getting it into the proper date', () => {
  let dateString = '09/13/1999 5:36 PM';
  let result = formatDateForUser(dateString);
  expect(result).toEqual('9/13/1999, 5:36 PM');
});

it('Date formatter works for getting it into the proper date', () => {
  let dateString = '';
  let result = formatDateForUser(dateString);
  expect(result).toEqual('unspecified');
});

it('Formats the date for sending to SQL', () => {
  let dateString = '09/13/1999 5:36 PM';
  let result = formatDateForMySql(dateString);
  expect(result).toEqual('1999-09-13 17:36:00');
});
