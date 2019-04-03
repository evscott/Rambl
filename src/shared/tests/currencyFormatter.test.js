import { convertToNumber, usdFormatter } from '../currencyFormatter';

it('Converts dollar number string to number', () => {
  let result = convertToNumber('$529.10');
  expect(+result).toEqual(529.1); // Convert to number
});

it('Does not convert dollar number string to number if unspecified', () => {
  let result = convertToNumber('unspecified');
  expect(result).toEqual(0);
});

it('Converts to USD', () => {
  let result = usdFormatter.format(456.2);
  expect(result).toEqual('$456.20');
});

it('Converts to USD with long decimal', () => {
  let result = usdFormatter.format(456.223234523454);
  expect(result).toEqual('$456.22');
});
