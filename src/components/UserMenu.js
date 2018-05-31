import React from 'react';
import LogoutLink from './LogoutLink';

const UserMenu = props => {
    return (
        <div className="user-menu">
            <a href="#" className="close-sub-menu" onClick={props.handleClose}>
                <i className="icon-close" />
            </a>
            <ul>
                <li>
                    <a href={'#'}>
                        <i className="icon-docs" />My Posts
                    </a>
                </li>
                <li>
                    <a href={'#'}>
                        <i className="icon-user" />Edit Profile
                    </a>
                </li>
                <li>
                    <a href={props.website} target="_blank">
                        <i className="icon-link" />View Website
                    </a>
                </li>
                <li>
                    <LogoutLink>
                        <i className="icon-logout" />Log Out
                    </LogoutLink>
                </li>
            </ul>
        </div>
    );
};

export default UserMenu;
