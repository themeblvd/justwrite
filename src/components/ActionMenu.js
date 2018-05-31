import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from './Button';

class ActionMenu extends Component {
    handleGoBack = event => {
        this.props.history.push('/');
    };

    btnText = () => {
        switch (this.props.action) {
            case 'update':
                return 'Update';
            case 'publish':
                return 'Publish';
            default:
                return 'New Post';
        }
    };

    render() {
        return (
            <ul className="action-menu">
                {(this.props.action == 'update' ||
                    this.props.action == 'publish') && (
                    <li>
                        <Button onClick={this.handleGoBack}>Go Back</Button>
                    </li>
                )}
                <li>
                    <Button primary>{this.btnText()}</Button>
                </li>
            </ul>
        );
    }
}

export default withRouter(
    connect(state => ({ action: state.posts.action }))(ActionMenu)
);
