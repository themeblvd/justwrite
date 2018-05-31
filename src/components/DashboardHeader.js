import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleMobileMenuDuration } from '../config';
import ActionMenu from './ActionMenu';
import UserMenu from './UserMenu';
import Button from './Button';

class DashboardHeader extends Component {
    handleUserMenuToggle = event => {
        event.preventDefault();
        document.body.classList.toggle('user-menu-on');
    };

    render() {
        return (
            <div className="dashboard-header">
                <div className="header-content">
                    <a
                        href="#"
                        className="menu-icon"
                        onClick={this.handleUserMenuToggle}
                    >
                        <span />
                        <span />
                        <span />
                    </a>
                    <a
                        href="#"
                        className="user-menu-trigger"
                        onClick={this.handleUserMenuToggle}
                    >
                        <img src={this.props.avatar} />
                        {this.props.first_name} {this.props.last_name}
                        <i className="icon-arrow-down" />
                    </a>
                    <ActionMenu />
                </div>
                <UserMenu
                    name={`${this.props.first_name} ${this.props.last_name}`}
                    avatar={this.props.avatar}
                    website={this.props.website}
                    handleClose={this.handleUserMenuToggle}
                />
            </div>
        );
    }
}

export default connect(state => ({
    ...state.auth,
    ...state.profile
}))(DashboardHeader);
