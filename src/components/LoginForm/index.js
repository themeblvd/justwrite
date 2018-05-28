import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { errorShakeDuration } from '../../config';
import Validate from '../../helpers/Validate';
import classNames from 'classnames';
import './style.scss';

class LoginForm extends Component {
    constructor() {
        super();

        this.validate = new Validate();

        this.state = {
            isLoading: false,
            inputs: {
                website: '',
                username: '',
                password: ''
            },
            fieldClasses: {
                website: '',
                username: '',
                password: ''
            },
            errors: {
                website: null,
                username: null,
                password: null
            }
        };
    }

    handleChange = event => {
        if (this.state.isLoading) {
            return false;
        }

        var { name, value } = event.target;

        this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                [name]: value
            }
        }));
    };

    handleValidate = event => {
        if (this.state.isLoading) {
            return false;
        }

        // Handle validation passed from submit event.
        if (event.type == 'submit') {
            var errors = this.validate.loginForm(this.state.inputs);

            this.setState({
                fieldClasses: {
                    website: classNames({
                        'field-error': errors.website,
                        'error-shake': errors.website
                    }),
                    username: classNames({
                        'field-error': errors.username,
                        'error-shake': errors.username
                    }),
                    password: classNames({
                        'field-error': errors.password,
                        'error-shake': errors.password
                    })
                },
                errors: errors
            });

            // Remove any 'error-shake' classes after animation is done.
            setTimeout(() => {
                this.setState({
                    fieldClasses: {
                        website: classNames({
                            'field-error': errors.website
                        }),
                        username: classNames({
                            'field-error': errors.username
                        }),
                        password: classNames({
                            'field-error': errors.password
                        })
                    }
                });
            }, errorShakeDuration);

            return errors;
        }

        // Handle validation for each individual form field, when focused off.
        var name = event.target.name;
        var error = this.validate.loginForm(name, this.state.inputs[name]);

        this.setState(prevState => ({
            fieldClasses: {
                ...prevState.fieldClasses,
                [name]: classNames({
                    'field-error': error,
                    'error-shake': error
                })
            },
            errors: {
                ...prevState.errors,
                [name]: error
            }
        }));

        if (error) {
            setTimeout(() => {
                this.setState(prevState => ({
                    fieldClasses: {
                        ...prevState.fieldClasses,
                        [name]: 'field-error' // remove "error-shake"
                    }
                }));
            }, errorShakeDuration);
        }
    };

    handleSubmit = event => {
        event.preventDefault();

        var errors = this.handleValidate(event);
        var isValid = true;

        // If there are any errors, bail out.
        for (let prop in errors) {
            if (errors[prop]) {
                isValid = false;
            }
        }

        if (isValid) {
            var user = {
                website: this.state.website,
                username: this.state.username,
                password: this.state.password
            };

            // this.user.login(this, user);
            this.setState({ isLoading: true });
            console.log(
                `Ok, now logging in ${this.state.inputs.username} to ${
                    this.state.inputs.website
                }` // @TODO
            );
        }
    };

    errorMsg = field => {
        var msg = this.state.errors[field];
        return msg ? <span className="error-msg">{msg}</span> : null;
    };

    render() {
        return (
            <form
                className="login-form"
                onSubmit={this.handleSubmit}
                noValidate
            >
                <p className={this.state.fieldClasses.website}>
                    <label htmlFor="website">WordPress Website URL</label>
                    <input
                        id="website"
                        name="website"
                        type="url"
                        placeholder="https://"
                        value={this.state.inputs.website}
                        onChange={this.handleChange}
                        onBlur={this.handleValidate}
                    />
                    {this.errorMsg('website')}
                </p>
                <p className={this.state.fieldClasses.username}>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={this.state.inputs.username}
                        onChange={this.handleChange}
                        onBlur={this.handleValidate}
                    />
                    {this.errorMsg('username')}
                </p>
                <p className={this.state.fieldClasses.password}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={this.state.inputs.password}
                        onChange={this.handleChange}
                        onBlur={this.handleValidate}
                    />
                    {this.errorMsg('password')}
                </p>
                <Button isLoading={this.state.isLoading}>
                    {this.state.isLoading ? 'Logging In...' : 'Log In'}
                </Button>
            </form>
        );
    }
}

// LoginForm.propTypes = {
//     // @TODO
// };

export default LoginForm;
