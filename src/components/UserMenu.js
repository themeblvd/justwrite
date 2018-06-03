import React from 'react';
import LogoutLink from './LogoutLink';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import faFileAlt from '@fortawesome/fontawesome-free-solid/faFileAlt';
// import faUser from '@fortawesome/fontawesome-free-solid/faUser';
// import faExternalLinkAlt from '@fortawesome/fontawesome-free-solid/faExternalLinkAlt';
// import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
// import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

// Temporary implementation of FontAwesome
import FontAwesomeIcon from './FontAwesomeIcon';
const faFileAlt = 'file-alt';
const faUser = 'user';
const faExternalLinkAlt = 'external-link-alt';
const faSignOutAlt = 'sign-out-alt';
const faTimes = 'times';

/**
 * User Menu Component
 *
 * This is a hidden menu of user options,
 * which needs to be toggled into view.
 *
 * @return {Component}
 */
const UserMenu = props => {
    return (
        <div className="user-menu">
            <a href="#" className="close-sub-menu" onClick={props.handleClose}>
                <FontAwesomeIcon icon={faTimes} className="close-sub-menu" />
            </a>
            <ul>
                <li>
                    <a href={'#'}>
                        <FontAwesomeIcon icon={faFileAlt} />My Posts
                    </a>
                </li>
                <li>
                    <a href={'#'}>
                        <FontAwesomeIcon icon={faUser} />Edit Profile
                    </a>
                </li>
                <li>
                    <a href={props.website} target="_blank">
                        <FontAwesomeIcon icon={faExternalLinkAlt} />View Website
                    </a>
                </li>
                <li>
                    <LogoutLink>
                        <FontAwesomeIcon icon={faSignOutAlt} />Log Out
                    </LogoutLink>
                </li>
            </ul>
        </div>
    );
};

export default UserMenu;
