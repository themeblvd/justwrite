import React from 'react';
import logo from '../assets/img/logo.svg';

/**
 * Login Page Logo
 *
 * @return {Component}
 */
const LoginLogo = () => {
    return (
        <div className="login-logo">
            <img src={logo} alt="Just Write" />
            <span className="tagline">
                A project by{' '}
                <a
                    href="https://jasonbobich.com"
                    title="Jason Bobich"
                    target="_blank"
                >
                    Jason Bobich
                </a>{' '}
                and{' '}
                <a
                    href="http://themeblvd.com"
                    title="WordPress Themes"
                    target="_blank"
                >
                    Theme Blvd
                </a>
            </span>
        </div>
    );
};

export default LoginLogo;
