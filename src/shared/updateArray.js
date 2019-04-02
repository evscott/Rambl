export const updateMultiDimensionalArray = (
  array,
  key,
  id,
  elementToBeAdded
) => {
  let newArr = Object.assign({}, array);
  if (newArr[key] === undefined) newArr[key] = {};
  newArr[key][id] = elementToBeAdded;
  return newArr;
};

export const updateSingleDimensionalArray = (array, key, elementToBeAdded) => {
  let newArr = Object.assign({}, array);
  newArr[key] = elementToBeAdded;
  return newArr;
};
