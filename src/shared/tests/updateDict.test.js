import { updateMultiDimensionalDict } from '../updateDict';

/**
 * Tests updating multi-dimensional arrays with new elements.
 */

let dict;

beforeEach(() => {
  dict = {
    fun: { times: 2, such: 'wow' },
    cool: { stuff: 'for', life: 'yup' }
  };
});

it('Should add a new element, new first level id', () => {
  let result = updateMultiDimensionalDict(dict, 'fly', 'believe', true);
  expect(result).toEqual({
    fun: { times: 2, such: 'wow' },
    cool: { stuff: 'for', life: 'yup' },
    fly: { believe: true }
  });
});

it('Should add a new element, new second level id', () => {
  let result = updateMultiDimensionalDict(dict, 'cool', 'believe', true);
  expect(result).toEqual({
    fun: { times: 2, such: 'wow' },
    cool: { stuff: 'for', life: 'yup', believe: true }
  });
});

it('Should add a new element, overwriting old id', () => {
  let result = updateMultiDimensionalDict(dict, 'cool', 'stuff', true);
  expect(result).toEqual({
    fun: { times: 2, such: 'wow' },
    cool: { stuff: true, life: 'yup' }
  });
});
