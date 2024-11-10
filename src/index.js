import fs from 'fs';
import path from 'path';
import parse from './parse/index.js';
import getDiff from './formatters/index.js';

const getData = (filepath) => {
  const absoluteFilepath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absoluteFilepath, 'utf-8');
  return data;
};

export default function difference(filepath1, filepath2, format = 'stylish') {
  const fileData1 = getData(filepath1);
  const fileData2 = getData(filepath2);
  const extname1 = path.extname(filepath1);
  const extname2 = path.extname(filepath2);

  const obj1 = parse(fileData1, extname1);
  const obj2 = parse(fileData2, extname2);

  const diff = getDiff(obj1, obj2, format);
  return diff;
}
