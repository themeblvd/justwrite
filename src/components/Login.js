import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { endLoading } from '../store/status';
import LoginLogo from './LoginLogo';
import LoginForm from './LoginForm';
import DashboardFooter from './DashboardFooter';

/**
 * Login Page
 *
 * This component displays the top-level admin
 * screen. It's connected to the /login route,
 * which is redirected to whenever the user
 * isn't logged in.
 */
class Login extends Component {
    /**
     * Once the component mounts, we can tell
     * the store everything is done loading.
     */
    componentDidMount = () => {
        if (this.props.appStatus == 'is-loading') {
            this.props.endLoading('app');
        }
    };

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        return (
            <div className="login-page">
                <header className="login-header">
                    <div className="wrap">
                        <LoginLogo />
                    </div>
                </header>
                <section className="login-section">
                    <div className="wrap">
                        <LoginForm />
                    </div>
                </section>
                <DashboardFooter />
            </div>
        );
    }
}

export default connect(state => ({ appStatus: state.status.app }), {
    endLoading
})(Login);
