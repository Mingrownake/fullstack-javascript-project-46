import getDiff from '../src/formatters/index.js';

describe("getDiff's main flow", () => {
  const data1 = {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: {},
        doge: {
          wow: '',
        },
      },
    },
    group1: {
      baz: 'bas',
      foo: 'bar',
      nest: {
        key: 'value',
      },
    },
    group2: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  };

  const data2 = {
    common: {
      follow: false,
      setting1: 'Value 1',
      setting3: null,
      setting4: 'blah blah',
      setting5: {
        key5: 'value5',
      },
      setting6: {
        key: {},
        ops: 'vops',
        doge: {
          wow: 'so much',
        },
      },
    },
    group1: {
      foo: 'bar',
      baz: 'bars',
      nest: 'str',
    },
    group3: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  };

  test('stylish format', () => {
    expect(getDiff(data1, data2, 'stylish')).toBe(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: {}
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
  });

  test('plain format', () => {
    expect(getDiff(data1, data2, 'plain'))
      .toBe(`Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`);
  });

  test('json format', () => {
    expect(getDiff(data1, data2, 'json')).toBe(`{
  "changed": {
    "common.setting3": {
      "old": true,
      "new": null
    },
    "common.setting6.doge.wow": {
      "old": "",
      "new": "so much"
    },
    "group1.baz": {
      "old": "bas",
      "new": "bars"
    },
    "group1.nest": {
      "old": {
        "key": "value"
      },
      "new": "str"
    }
  },
  "added": {
    "common.follow": false,
    "common.setting4": "blah blah",
    "common.setting5": {
      "key5": "value5"
    },
    "common.setting6.ops": "vops",
    "group3": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  },
  "removed": {
    "common.setting2": 200,
    "group2": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  }
}`);
  });
});

describe("getDiff's invalid format", () => {
  test('empty format', () => {
    expect(() => getDiff({}, {}, '')).toThrow();
  });

  test('unknown format', () => {
    expect(() => getDiff({}, {}, 'stplain')).toThrow();
  });
});
