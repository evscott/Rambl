export const filterMultiDimensionalArray = (array, key, id) => {
  let newArr = Object.assign({}, array);
  delete newArr[key][id];
  return newArr;
}

export const filterSingleDimensionalArray = (array, key) => {
  let newArr = Object.assign({}, array);
  delete newArr[key];
  return newArr;
}