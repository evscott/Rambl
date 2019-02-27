export const updateArray = (array, key, id, elementToBeAdded) => {
  let newArr = Object.assign({}, array);
  newArr[key][id] = elementToBeAdded;
  return newArr;
}