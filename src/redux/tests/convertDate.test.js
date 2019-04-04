import { convertDate } from '../getters/convertDate';

it('Can convert dates into Date form', () => {
  // Try converting a date, test in GMT format
  let date = convertDate('2019-04-11T15:32:32.000Z');
  expect(date.toUTCString()).toEqual('Thu, 11 Apr 2019 15:32:32 GMT');
});
