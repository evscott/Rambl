/**
 * This filters a multi-dimensional dictionary by removing a single
 * id from the inner dictionary. This is useful for removing an event
 * from the quick event look-up tables.
 * @param dict the multi-level dictonary
 * @param key the key in the first dict dimension with information to
 * filter out
 * @param id the id of the key to remove
 * @returns {any} the new dictionary that has been filtered
 */
export const filterMultiDimensionalDict = (dict, key, id) => {
  // For the record, this does a shallow copy. Thus, when the item
  // in the inner dictionary is deleted, it's gone from the old
  // dict as well as the new dict, which defeats the purpose of this
  // copy.
  let newArr = Object.assign({}, dict);
  if(newArr[key] !== undefined && newArr[key][id] !== null) {
    delete newArr[key][id];
  }
  return newArr;
};
