import { stripSlash } from '../formatting';

test('A URL string without a trailing slash should be left alone.', () => {
  expect(stripSlash('https://google.com')).toBe('https://google.com');
});

test('A URL string with a trailing slash should have that slash removed.', () => {
  expect(stripSlash('https://google.com/')).toBe('https://google.com');
});
