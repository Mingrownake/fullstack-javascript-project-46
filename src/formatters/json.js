import _ from 'lodash';

const set = (acc, type, pathArray, [key, value]) => {
  const path = [...pathArray, key].join('.');
  const newAcc = _.set(_.cloneDeep(acc), `${type}['${path}']`, value);
  return newAcc;
};

const jsonAssets = {
  iterValue: [],
  getDefaultAcc() {
    return { changed: {}, added: {}, removed: {} };
  },
  getNewIterValue(pathArray, key) {
    return [...pathArray, key];
  },
  merge(acc, childAcc) {
    return _.merge(acc, childAcc);
  },
  addChanged(acc, key, [value1, value2], pathArray) {
    const value = { old: value1, new: value2 };
    return set(acc, 'changed', pathArray, [key, value]);
  },
  addAdded(acc, key, value2, pathArray) {
    return set(acc, 'added', pathArray, [key, value2]);
  },
  addRemoved(acc, key, value1, pathArray) {
    return set(acc, 'removed', pathArray, [key, value1]);
  },
  addUnchanged(acc) {
    return acc;
  },
  convert(difference) {
    return JSON.stringify(difference, null, '  ');
  },
};

export default jsonAssets;
