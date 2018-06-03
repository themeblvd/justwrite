import React, { Component } from 'react';

// Application Styles
import 'react-mde/lib/styles/css/react-mde-all.css';
import './assets/scss/main.scss';

// Store
import { connect } from 'react-redux';
import { verify } from './store/auth';

// Utilities
import classNames from 'classnames';

// Routing & Transitions
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// Components
import Loading from './components/Loading';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

/**
 * Top Level Application
 */
class App extends Component {
    /**
     * App classes.
     *
     * The application monitors a global status in
     * the store, and this triggers the CSS class
     * changes here.
     *
     * For the most part, this just toggles the
     * top-level applicatoin loader and handles its
     * animation.
     */
    getAppClassNames = () => {
        switch (this.props.appStatus) {
            case 'showing-loader':
            case 'is-loading':
                return 'app is-loading show-loader';

            case 'hiding-loader':
                return 'app is-loading hide-loader';

            default:
                return 'app';
        }
    };

    /**
     * Verify the user data.
     *
     * If there is user data saved in local storage
     * (i.e. the user has already logged in), we'll
     * do an API request to make sure the JWT token
     * is still valid. And if it's not valid, they
     * need to login again.
     */
    componentDidMount() {
        this.props.verify();
    }

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        const { isLoading, hasVerified, isAuthenticated } = this.props;

        return (
            <div className={this.getAppClassNames()}>
                {hasVerified && (
                    <Switch>
                        <Route path="/login" component={Login} />
                        <PrivateRoute path="/" component={Dashboard} />
                    </Switch>
                )}
                <Loading className="app-loader" />
            </div>
        );
    }
}

export default withRouter(
    connect(state => ({ ...state.auth, appStatus: state.status.app }), {
        verify
    })(App)
);
