import React from 'react';
import './style.scss';
import logo from '../../_assets/img/logo.svg';

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
                    href="https://themeblvd.com"
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
