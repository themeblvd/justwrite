import { unautop } from '../formatting';

test('A single paragraph should have opening and closing p tags stripped.', () => {
  const result = unautop('<p>Hello, world!</p>');
  expect(result).toBe('Hello, world!');
});

test('Two paragraphs should have opening and closing p tags stripped, with two new-line chars inbetween.', () => {
  const result = unautop('<p>First paragraph.</p><p>Second paragraph.</p>');
  expect(result).toBe('First paragraph.\n\nSecond paragraph.');
});

test('A break formatted as <br> should be replaced with a single new-line char.', () => {
  const result = unautop('First line.<br>Second line.');
  expect(result).toBe('First line.\nSecond line.');
});

test('A break formatted as <br/> should be replaced with a single new-line char.', () => {
  const result = unautop('First line.<br/>Second line.');
  expect(result).toBe('First line.\nSecond line.');
});

test('A break formatted as <br /> should be replaced with a single new-line char.', () => {
  const result = unautop('First line.<br />Second line.');
  expect(result).toBe('First line.\nSecond line.');
});
