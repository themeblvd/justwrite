import React, { Component } from 'react';
import './_assets/scss/main.scss'; // Must come before components.
import Validate from './_actions/Validate';
import User from './_actions/User';
import LoginPage from './login-page';

export default class App extends Component {
    constructor() {
        super();

        this.validate = new Validate();
        this.user = new User();

        this.state = {
            isLoggedIn: false,
            loginErrors: {
                website: null,
                username: null,
                password: null
            }
        };
    }

    handleLoginSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const errors = this.validate.loginForm(form);

        this.setState({
            loginErrors: errors
        });

        // If there are any errors, bail out.
        for (let prop in errors) {
            if (errors[prop]) {
                return false;
            }
        }

        // There are no validation errors, so let's now
        // try to login.
        this.user.login(this, {
            website: form.website.value,
            username: form.website.username,
            password: form.password.value
        });
    };

    currentPage = () => {
        if (this.state.isLoggedIn) {
            return <h1>Dashboard...</h1>;
        } else {
            return (
                <LoginPage
                    handleSubmit={this.handleLoginSubmit}
                    errors={this.state.loginErrors}
                />
            );
        }
    };

    render() {
        return <div className="app">{this.currentPage()}</div>;
    }
}
