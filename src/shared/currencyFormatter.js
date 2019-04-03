/**
 *
 * @type {Intl.NumberFormat}
 */
export const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

/**
 * Removes the currency symbol from a string.
 * @param currency
 * @returns number
 */
export const convertToNumber = (currency) => {
  if (currency === 'unspecified') return 0;
  else return +currency.substring(1, currency.length); // Strip out currency symbol
};
