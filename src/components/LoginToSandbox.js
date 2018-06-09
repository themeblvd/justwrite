import React, { Component } from 'react';
import axios from 'axios';
import { sandbox, animationDuration } from '../config';
import { connect } from 'react-redux';
import { authenticate, authError } from '../store/auth';
import { startLoading } from '../store/status';
import { Redirect, withRouter, Link } from 'react-router-dom';

/**
 * Link to "play in the sandbox".
 *
 * The idea here is to help those wanting to demo
 * the application, which do not want to login to
 * their own WordPress site (or don't have one).
 *
 * This component basically just accomodates the
 * world's most insecure login system every created:
 *
 * 1. User clicks the "Play in the sandbox" link from
 *    the client application.
 * 2. An AJAX GET request is sent to our authorization
 *    token generator living at justwrite.app (uses PHP).
 * 3. Our token generator reaches out to the sandbox
 *    demo WordPress site at sandbox.justwrite.app with
 *    username and password to produce a authorization
 *    token.
 * 4. Our token generator then sends the JWT token back
 *    to the client that clicked the link. They're now
 *    logged in and see changes they make appear on the
 *    live sandbox WordPress site.
 *
 * Notes:
 *
 * 1. The user of the sandbox WordPress site has a custom
 *    set of limited capabilities so that if they start
 *    using the token to make their own POST/PUT requests
 *    or change the password to access the actual WP admin,
 *    they can only do so much damage.
 * 2. Our server has a cron job set up that restores the
 *    sandbox WP site's database and all files back to an
 *    origial state every couple of hours.
 */
class LoginToSandbox extends Component {
    /**
     * When "Play in the sandbox" link is
     * clicked, login through exernal sandbox
     * API.
     */
    handleLogin = event => {
        event.preventDefault();

        this.props.startLoading('app');

        axios
            .get(sandbox.auth)
            .then(response => {
                var user = {
                    ...response.data,
                    website: sandbox.url
                };

                localStorage.setItem('user', JSON.stringify(user));

                this.props.authenticate(user);

                setTimeout(() => {
                    this.props.history.push('/');
                }, animationDuration.fadeApp);
            })
            .catch(error => {
                this.props.authError('login', 'Could not log in.');
            });
    };

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        return (
            <span className="sandbox-link">
                Or{' '}
                <a href="#" onClick={this.handleLogin}>
                    play in the sandbox
                </a>
            </span>
        );
    }
}

export default withRouter(
    connect(null, { authenticate, authError, startLoading })(LoginToSandbox)
);
