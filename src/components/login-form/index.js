import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import './style.scss';

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            website: '',
            username: '',
            password: ''
        };
    }

    handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    };

    errorClass = field => {
        return this.props.errors[field] ? 'field-error' : null;
    };

    errorMsg = field => {
        var msg = this.props.errors[field];
        return msg ? <span className="error-msg">{msg}</span> : null;
    };

    render() {
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit}
                noValidate
            >
                <p className={this.errorClass('website')}>
                    <label htmlFor="website">WordPress Website URL</label>
                    <input
                        id="website"
                        name="website"
                        type="url"
                        placeholder="https://"
                        value={this.state.website}
                        onChange={this.handleChange}
                    />
                    {this.errorMsg('website')}
                </p>
                <p className={this.errorClass('username')}>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    {this.errorMsg('username')}
                </p>
                <p className={this.errorClass('password')}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    {this.errorMsg('password')}
                </p>
                <Button>Log In</Button>
            </form>
        );
    }
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func,
    website: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string
};

export default LoginForm;
