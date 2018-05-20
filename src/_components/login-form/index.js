import React, { Component } from 'react';
import './style.scss';

export default class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            url: '',
            username: '',
            password: ''
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleValidate = event => {
        console.log('validate...');
    };

    render() {
        return (
            <form className="login-form" onSubmit={this.props.handleSubmit}>
                <p>
                    <label htmlFor="url">WordPress Website URL</label>
                    <input
                        id="url"
                        name="url"
                        type="url"
                        placeholder="https://"
                        value={this.state.url}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </p>
                <button>Log In</button>
            </form>
        );
    }
}
