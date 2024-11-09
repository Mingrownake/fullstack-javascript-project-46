 import parsers from "../src/parsers"
 
 test('Not enough arguments', () => {
   expect(() => {
    parsers()
   }).toThrow()
 });

 test('First file not found', () => {
   expect(() => {
    parsers('/file1.json', '__fixteres__/file2.json')
   }).toThrow()
 });

 test('Second file not found', () => {
   expect(() => {
    parsers('__fixtures__/file1.json', '/file2.json')
   }).toThrow()
 });

 test('Correct arguments', () => {
   expect(() => {
    parsers('__fixtures__/file1.json', '__fixtures__/file2.json')
   }).not.toThrow()
 })

 test('Correct parsing JSON', () => {
  const result = parsers('__fixtures__/file1.json', '__fixtures__/file2.json');
  expect(result).toBe(
  `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`)
})

test('Correct parsing YAML', () => {
  const result = parsers('__fixtures__/file1.yaml', '__fixtures__/file2.yaml');
  expect(result).toBe(
  `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`)
})