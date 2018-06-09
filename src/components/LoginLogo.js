import React from 'react';
import { project } from '../config';
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
            <span className="tagline">{project.description}</span>
        </div>
    );
};

export default LoginLogo;
