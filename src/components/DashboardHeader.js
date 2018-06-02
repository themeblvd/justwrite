import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionMenu from './ActionMenu';
import UserMenu from './UserMenu';
import Button from './Button';

/**
 * Dashboard Header
 *
 * Displays the header used across the
 * entire app.
 */
class DashboardHeader extends Component {
    /**
     * Toggles the display of the user menu, for
     * both desktop and mobile.
     *
     * This works by just toggling on and off the
     * `user-menu-on` class and the rest is handled
     * through CSS.
     *
     * @param {Event} event
     */
    handleUserMenuToggle = event => {
        event.preventDefault();
        document.body.classList.toggle('user-menu-on');
    };

    /**
     * Render component.
     *
     * @return {Component}
     */
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
