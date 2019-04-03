export const updateMultiDimensionalDict = (
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
