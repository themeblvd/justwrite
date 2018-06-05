import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store/auth';

/**
 * Logout Link
 *
 * @param  {Object}    props           Component props.
 * @param  {Number}    props.logout    Handle log out functionality, from store.
 * @param  {Object}    props.children  Optional. Custom text for link.
 * @return {Component}
 */
const LogoutLink = props => {
    return (
        <a
            href="#"
            className="logout-link"
            title="Log out"
            onClick={props.logout}
        >
            {props.children ? props.children : 'Log out'}
        </a>
    );
};

export default connect(null, { logout })(LogoutLink);
