export const filterArray = (array, key, id) => {
  let newArr = Object.assign({}, array);
  delete newArr[key][id];
  return newArr;
}