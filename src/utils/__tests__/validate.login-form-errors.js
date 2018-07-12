import { loginFormErrors } from '../validate';

// Check individually passed fields, used with React's
// controlling of inputs.

test("An individually passed website field should tell the user it's required if they've left it empty.", () => {
  const result = loginFormErrors('website', '');
  expect(result).toBe('Website URL for your WordPress website is required.');
});

test("An individually passed website field that's invalid should tell the user that.", () => {
  const result = loginFormErrors('website', 'google.com'); // Missing protocol (i.e. http or https).
  expect(result).toBe('Enter a valid Website URL.');
});

test('An individually passed website field should be a valid URL.', () => {
  const result = loginFormErrors('website', '');
  expect(result).toBe('Website URL for your WordPress website is required.');
});

test("An individually passed username field should tell the user it's required if they've left it empty.", () => {
  const result = loginFormErrors('username', '');
  expect(result).toBe('Username for your WordPress website is required.');
});

test("Any individually passed username value that's not a blank value should not return any error.", () => {
  const result = loginFormErrors('username', 'john');
  expect(result).toBe(null);
});

test("An individually passed password field should tell the user it's required if they've left it empty.", () => {
  const result = loginFormErrors('password', '');
  expect(result).toBe('Password for your WordPress website is required.');
});

test("Any individually passed password value that's not a blank value should not return any error.", () => {
  const result = loginFormErrors('password', 'foo');
  expect(result).toBe(null);
});

// Check entire form data, when submitting login form.

test('When submitting form, if username, password, or website are blank, there should be cooresponding errors for each.', () => {
  const result = loginFormErrors({
    website: '',
    username: '',
    password: ''
  });
  expect(result).toEqual({
    website: 'Website URL for your WordPress website is required.',
    username: 'Username for your WordPress website is required.',
    password: 'Password for your WordPress website is required.'
  });
});
