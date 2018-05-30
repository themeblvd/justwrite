import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { endLoading } from '../store/status';
import LoginLogo from './LoginLogo';
import LoginForm from './LoginForm';

class Login extends Component {
    componentDidMount = () => {
        if (this.props.appStatus == 'is-loading') {
            this.props.endLoading('app');
        }
    };

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
            </div>
        );
    }
}

export default connect(state => ({ appStatus: state.status.app }), {
    endLoading
})(Login);
