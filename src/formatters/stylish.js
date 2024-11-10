import _ from 'lodash';

function getConvertedStylishDiff(difference) {
  const iter = (data, depth) => {
    if (data.length === 0) {
      return '{}';
    }

    const res = data.map(([symbol, key, value]) => {
      const currentValue = _.isArray(value) ? iter(value, depth + 1) : value;
      return `  ${symbol} ${key}: ${currentValue}`;
    });

    const space = ' '.repeat(4 * depth);
    return `{\n${space}${res.join(`\n${space}`)}\n${space}}`;
  };

  return iter(difference, 0);
}

const extractor = (el) => {
  if (!_.isObject(el)) {
    return el;
  }

  const children = Object.entries(el);
  return children.map(([key, value]) => [' ', key, extractor(value)]);
};

const stylishAssets = {
  iterValue: null,
  getDefaultAcc() {
    return [];
  },
  getNewIterValue() {
    return null;
  },
  merge(acc, childAcc, key) {
    return [...acc, [' ', key, childAcc]];
  },
  addChanged(acc, key, [value1, value2]) {
    const prop1 = ['-', key, extractor(value1)];
    const prop2 = ['+', key, extractor(value2)];
    return [...acc, prop1, prop2];
  },
  addAdded(acc, key, value2) {
    const value = extractor(value2);
    return [...acc, ['+', key, value]];
  },
  addRemoved(acc, key, value1) {
    const value = extractor(value1);
    return [...acc, ['-', key, value]];
  },
  addUnchanged(acc, key, value1) {
    return [...acc, [' ', key, value1]];
  },
  convert: getConvertedStylishDiff,
};

export default stylishAssets;
