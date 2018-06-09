import React from 'react';

/**
 * Login Page Information
 *
 * @return {Component}
 */
const LoginInfo = () => {
    return (
        <React.Fragment>
            <h1>Start Writing</h1>
            <p>
                Manage posts from any WordPress website that's secured with{' '}
                <em>https</em> and has{' '}
                <a
                    href="https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/"
                    target="_blank"
                >
                    JWT Authentication for WP REST API
                </a>{' '}
                setup.
            </p>
        </React.Fragment>
    );
};

export default LoginInfo;
