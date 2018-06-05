/**
 * Validate URL.
 *
 * @param  {String}  url Website URL.
 * @return {Boolean}     Whether valid URL or not.
 */
export function validateUrl(url) {
    var pattern = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return pattern.test(url);
}

/**
 * Validate data from the login form. Group of
 * fields, or indvidual field.
 *
 * @param  {Object|String} inputs Either array of inputs, or single field name.
 * @param  {String}        value  For single field, the value.
 * @return {Array|String}         Errors for all fields, or error for single field.
 */
export function validateLoginForm(inputs, value) {
    var singleInputName = typeof inputs == 'string' ? inputs : null;

    if (singleInputName) {
        var inputs = {
            [singleInputName]: value
        };
    }

    var errors = {
        website: null,
        username: null,
        password: null
    };

    if (!inputs.website) {
        errors.website = 'Website URL for your WordPress website is required.';
    } else if (!validateUrl(inputs.website)) {
        errors.website = 'Enter a valid Website URL.';
    } else if (!inputs.website.includes('https')) {
        errors.website = 'The website must be secured with https.';
    }

    if (!inputs.username) {
        errors.username = 'Username for your WordPress website is required.';
    }

    if (!inputs.password) {
        errors.password = 'Password for your WordPress website is required.';
    }

    if (singleInputName) {
        return errors[singleInputName];
    } else {
        return errors;
    }
}
