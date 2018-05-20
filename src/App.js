import React, { Component } from 'react';
import './_assets/scss/main.scss'; // Must come before components.
import LoginPage from './login-page';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false
        };
    }

    handleLoginSubmit = event => {
        event.preventDefault();
        console.log('login!');
    };

    render() {
        return (
            <div className="app">
                <LoginPage handleSubmit={this.handleLoginSubmit} />
            </div>
        );
    }
}
