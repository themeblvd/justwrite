import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import LoginLogo from '../_components/login-logo';
import LoginInfo from '../_components/login-info';
import LoginForm from '../_components/login-form';

const LoginPage = props => {
    return (
        <div className="login-page">
            <header className="login-header">
                <div className="wrap">
                    <LoginLogo />
                </div>
            </header>
            <section className="login-section">
                <div className="wrap">
                    <LoginInfo />
                    <LoginForm
                        handleSubmit={props.handleSubmit}
                        errors={props.errors}
                    />
                </div>
            </section>
        </div>
    );
};

LoginPage.propTypes = {
    handleSubmit: PropTypes.func,
    errors: PropTypes.object
};

export default LoginPage;
