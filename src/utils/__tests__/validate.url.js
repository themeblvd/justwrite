import { validateUrl } from '../validate';

test('URL with missing protocol should not validate.', () => {
  const result = validateUrl('google.com');
  expect(validateUrl('google.com')).toBe(false);
});

test('URL with misspelled protocol should not validate.', () => {
  const result = validateUrl('httpps://google.com');
  expect(result).toBe(false);
});

test('URL with http protocol should validate.', () => {
  const result = validateUrl('http://google.com');
  expect(result).toBe(true);
});

test('URL with https protocol should validate.', () => {
  const result = validateUrl('https://google.com');
  expect(result).toBe(true);
});
