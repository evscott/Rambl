export const updateMultiDimensionalDict = (
  dict,
  key,
  id,
  elementToBeAdded
) => {
  let newArr = Object.assign({}, dict);
  if (newArr[key] === undefined) newArr[key] = {};
  newArr[key][id] = elementToBeAdded;
  return newArr;
};
