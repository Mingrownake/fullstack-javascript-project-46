 import parse from "../src/parse"
 
 test('Not enough arguments', () => {
   expect(() => {
     parse()
   }).toThrow()
 });

 test('First file not found', () => {
   expect(() => {
     parse('/file1.json', '__fixteres__/file2.json')
   }).toThrow()
 });

 test('Second file not found', () => {
   expect(() => {
     parse('__fixtures__/file1.json', '/file2.json')
   }).toThrow()
 });

 test('Correct arguments', () => {
   expect(() => {
     parse('__fixtures__/file1.json', '__fixtures__/file2.json')
   }).not.toThrow()
 })

 test('Correct parsing', () => {
  const result = parse('__fixtures__/file1.json', '__fixtures__/file2.json');
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