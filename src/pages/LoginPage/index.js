import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import LoginLogo from '../../components/LoginLogo';
import LoginInfo from '../../components/LoginInfo';
import LoginForm from '../../components/LoginForm';

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
