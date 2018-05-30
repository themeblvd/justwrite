import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
    render() {
        const { isAuthenticated, path } = this.props;
        const Component = this.props.component;

        return isAuthenticated ? (
            <Route path={path} component={Component} />
        ) : (
            <Redirect to="/login" />
        );
    }
}

export default connect(state => state.auth)(PrivateRoute);
