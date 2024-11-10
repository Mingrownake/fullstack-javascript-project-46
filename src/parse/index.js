import yaml from 'js-yaml';
import iniParse from './iniParse.js';
import xmlParse from './xmlParse.js';

export default function parse(data, extname) {
  switch (extname) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    case '.ini':
      return iniParse(data);
    case '.xml':
      return xmlParse(data);
    default:
      throw new Error(`Unexpected file format (${extname})`);
  }
}
