class Validate {
    static url = value => {
        var pattern = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return pattern.test(value);
    };

    static stripSlash = url => {
        return url.replace(/\/$/, '');
    };

    static loginForm = (inputs, value) => {
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
            errors.website =
                'Website URL for your WordPress website is required.';
        } else if (!Validate.url(inputs.website)) {
            errors.website = 'Enter a valid Website URL.';
        } else if (!inputs.website.includes('https')) {
            errors.website = 'The website must be secured with https.';
        }

        if (!inputs.username) {
            errors.username =
                'Username for your WordPress website is required.';
        }

        if (!inputs.password) {
            errors.password =
                'Password for your WordPress website is required.';
        }

        if (singleInputName) {
            return errors[singleInputName];
        } else {
            return errors;
        }
    };
}

export default Validate;
