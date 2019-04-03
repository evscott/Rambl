import { filterMultiDimensionalDict } from '../filterDict';

/**
 * Tests filtering of the multi-dimensional dictionary to remove
 * an element from it.
 */
let dict;

beforeEach(() => {
  dict = {
    fun: { times: 2, such: 'wow' },
    cool: { stuff: 'for', life: 'yup' }
  };
});

it('Filters out the desired id', () => {
  let result = filterMultiDimensionalDict(dict, 'fun', 'times');
  expect(result).toEqual({
    fun: { such: 'wow' },
    cool: { stuff: 'for', life: 'yup' }
  });
});

it('Does not crash with bad first key', () => {
  let result = filterMultiDimensionalDict(dict, 'nope', 'times');
  expect(result).toEqual({
    fun: { times: 2, such: 'wow' },
    cool: { stuff: 'for', life: 'yup' }
  });
});

it('Does not crash with bad second key', () => {
  let result = filterMultiDimensionalDict(dict, 'fun', 'stuff');
  expect(result).toEqual({
    fun: { times: 2, such: 'wow' },
    cool: { stuff: 'for', life: 'yup' }
  });
});
