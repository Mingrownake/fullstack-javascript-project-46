import stylishAssets from './stylish.js';
import plainAssets from './plain.js';
import jsonAssets from './json.js';
import formatterEngine from './engine.js';

export default function getDiff(data1, data2, format) {
  switch (format) {
    case 'stylish':
      return formatterEngine(data1, data2, stylishAssets);
    case 'plain':
      return formatterEngine(data1, data2, plainAssets);
    case 'json':
      return formatterEngine(data1, data2, jsonAssets);
    default:
      throw new Error(`unknown format, used ${format}`);
  }
}
