import _ from 'lodash';

export default function getKeys(data1, data2) {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  return _.union(keys1, keys2).toSorted();
}
