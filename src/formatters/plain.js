import _ from 'lodash';

function formatValue(value) {
  switch (true) {
    case _.isObject(value):
      return '[complex value]';
    case _.isString(value):
      return `'${value}'`;
    default:
      return value;
  }
}

const plainAssets = {
  iterValue: [],
  getDefaultAcc() {
    return [];
  },
  getNewIterValue(pathArray, key) {
    return [...pathArray, `${key}.`];
  },
  merge(acc, childAcc) {
    return [...acc, ...childAcc];
  },
  addChanged(acc, key, [value1, value2], pathArray) {
    const formatedVal1 = formatValue(value1);
    const formatedVal2 = formatValue(value2);
    return [
      ...acc,
      `Property '${pathArray.join('')}${key}' was updated. From ${formatedVal1} to ${formatedVal2}`,
    ];
  },
  addAdded(acc, key, value2, pathArray) {
    const formatedVal = formatValue(value2);
    return [...acc, `Property '${pathArray.join('')}${key}' was added with value: ${formatedVal}`];
  },
  addRemoved(acc, key, value1, pathArray) {
    return [...acc, `Property '${pathArray.join('')}${key}' was removed`];
  },
  addUnchanged(acc) {
    return acc;
  },
  convert(difference) {
    return difference.join('\n');
  },
};

export default plainAssets;
