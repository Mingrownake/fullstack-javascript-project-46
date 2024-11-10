import _ from 'lodash';
import getKeys from '../getKeys.js';

export default function formatterEngine(
  data1,
  data2,
  {
    iterValue,
    getDefaultAcc,
    getNewIterValue,
    merge,
    addChanged,
    addAdded,
    addRemoved,
    addUnchanged,
    convert,
  },
) {
  const iter = (obj1, obj2, initialIterValue) => {
    const keys = getKeys(obj1, obj2);

    return keys.reduce((acc, key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      switch (true) {
        case _.isObject(value1) && _.isObject(value2): {
          const newIterValue = getNewIterValue(initialIterValue, key);
          return merge(acc, iter(value1, value2, newIterValue), key);
        }
        case !Object.hasOwn(obj1, key):
          return addAdded(acc, key, value2, initialIterValue);
        case !Object.hasOwn(obj2, key):
          return addRemoved(acc, key, value1, initialIterValue);
        case value1 !== value2:
          return addChanged(acc, key, [value1, value2], initialIterValue);
        default:
          return addUnchanged(acc, key, value1, initialIterValue);
      }
    }, getDefaultAcc());
  };

  const res = iter(data1, data2, iterValue);
  return convert(res);
}
