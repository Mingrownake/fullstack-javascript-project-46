import parse from '../src/parse/index.js';

test("parse's main flow", () => {
  const jsonData = `{
  "host": "hexlet.io",
  "system": {
   "time": 128,
    "os": "Linux"
  }
}`;

  const yamlData = `---
host: hexlet.io
system:
  time: 128
  os: Linux
`;

  const iniData = `host=hexlet.io

[system]
time=128
os=Linux`;

  const xmlData = `<?xml version="1.0" encoding="UTF-8" ?>
 <root>
     <host>hexlet.io</host>
     <system>
         <time>128</time>
         <os>Linux</os>
     </system>
 </root>`;

  const expected = {
    host: 'hexlet.io',
    system: {
      time: 128,
      os: 'Linux',
    },
  };

  expect(parse(jsonData, '.json')).toStrictEqual(expected);
  expect(parse(yamlData, '.yml')).toStrictEqual(expected);
  expect(parse(iniData, '.ini')).toStrictEqual(expected);
  expect(parse(xmlData, '.xml')).toStrictEqual(expected);
});

describe('parse invalid file', () => {
  test('parse isEmpty', () => {
    expect(() => parse()).toThrow();
  });

  test('parse invalid file type', () => {
    expect(() => parse('{"host": "hexlet.io"}', '.exe')).toThrow();
  });

  test('parse invalid file data', () => {
    expect(() => parse('{{"host": "hexlet.io"}', '.json')).toThrow();
  });
});
