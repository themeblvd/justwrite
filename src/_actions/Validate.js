class Validate {
    loginForm = form => {
        var errors = {
            website: null,
            username: null,
            password: null
        };

        if (!form.website.value) {
            errors.website =
                'Website URL for your WordPress website is required.';
        } else if (!this.url(form.website.value)) {
            errors.website = 'Enter a valid Website URL.';
        } else if (!form.website.value.includes('https')) {
            errors.website = 'The website must be secured with https.';
        }

        if (!form.username.value) {
            errors.username =
                'Username for your WordPress website is required.';
        }

        if (!form.password.value) {
            errors.password =
                'Password for your WordPress website is required.';
        }

        return errors;
    };

    url = value => {
        var pattern = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return pattern.test(value);
    };
}

export default Validate;
