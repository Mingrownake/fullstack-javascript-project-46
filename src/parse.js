import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import path from 'node:path';
import _ from 'lodash';

const parse = (firstPath, secondPath) => {
  const firstFilePath = path.resolve(cwd(), firstPath);
  const secondFilePath = path.resolve(cwd(), secondPath);
  const firstObj = JSON.parse(readFileSync(firstFilePath));
  const secondObj = JSON.parse(readFileSync(secondFilePath));
  const keys = _.sortBy(_.union(Object.keys(firstObj), Object.keys(secondObj)));
  const rsl = keys.reduce((acc, key) => {
    if (!_.has(firstObj, key) && _.has(secondObj, key)) {
      return { ...acc, [`+ ${key}`]: secondObj[key] };
    }
    if (_.has(firstObj, key) && !_.has(secondObj, key)) {
      return { ...acc, [`- ${key}`]: firstObj[key] };
    }
    if (_.has(firstObj, key) && _.has(secondObj, key)) {
      if (firstObj[key] !== secondObj[key]) {
        return {
          ...acc,
          [`- ${key}`]: firstObj[key],
          [`+ ${key}`]: secondObj[key],
        };
      }
    }
    return { ...acc, [`  ${key}`]: firstObj[key] };
  }, {});
  return JSON.stringify(rsl, null, 2).replaceAll(/"|,/g, '');
};

export default parse;
