import React, { Component } from 'react';
import './assets/scss/main.scss'; // Must come before components.
import logo from './assets/img/logo.svg';
import Example from './components/example';

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <header>
                    <img
                        src={logo}
                        alt="My React App"
                        width="100"
                        height="100"
                    />
                    <h1>My React App</h1>
                </header>
                <Example />
            </div>
        );
    }
}
