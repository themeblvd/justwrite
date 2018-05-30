import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store/auth';

const LogoutLink = props => {
    return (
        <a
            href="#"
            className="logout-link"
            title="Log out"
            onClick={props.logout}
        >
            Log out
        </a>
    );
};

export default connect(null, { logout })(LogoutLink);
