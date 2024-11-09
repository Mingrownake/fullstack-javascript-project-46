import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import jsYaml from 'js-yaml';
import path from 'node:path';
import _ from 'lodash';

const parsers = (firstPath, secondPath) => {
  const firstObj = createJSON(firstPath);
  const secondObj = createJSON(secondPath);
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

const createJSON = (file) => {
  const filePath = path.resolve(cwd(), file);
  const extName = path.extname(filePath);
  if (extName === '.yaml' || extName === '.yml') {
    return jsYaml.load(readFileSync(filePath, 'utf-8'));
  }
  return JSON.parse(readFileSync(filePath, 'utf-8'));
};

export default parsers;
