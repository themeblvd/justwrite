import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPostData, updatePosts } from '../store/posts';
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
class UserMenu extends Component {
    /**
     * Display the profile modal.
     */
    handleShowProfile = event => {
        event.preventDefault();
        document.body.classList.remove('user-menu-on');
        const elem = document.getElementById('edit-profile');
        elem.classList.add('show');
        setTimeout(() => {
            elem.classList.add('animate-in');
        }, 10);
    };

    /**
     * Filter the homepage posts to display
     * just the user's.
     */
    handleShowPosts = event => {
        event.preventDefault();

        document.body.classList.remove('user-menu-on');

        if (this.props.history.location.pathname != '/') {
            this.props.history.push('/');
        }

        this.props.updatePosts({}); // Trigger loader.
        this.props.loadPostData('posts', {
            author: this.props.userID,
            per_page: 100
        });
    };

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        return (
            <div className="user-menu">
                <a
                    href="#"
                    className="close-sub-menu"
                    onClick={this.props.handleClose}
                >
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="close-sub-menu"
                    />
                </a>
                <ul>
                    <li>
                        <a href="#" onClick={this.handleShowPosts}>
                            <FontAwesomeIcon icon={faFileAlt} />My Posts
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={this.handleShowProfile}>
                            <FontAwesomeIcon icon={faUser} />Edit Profile
                        </a>
                    </li>
                    <li>
                        <a href={this.props.website} target="_blank">
                            <FontAwesomeIcon icon={faExternalLinkAlt} />View
                            Website
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
    }
}

export default withRouter(
    connect(state => ({ userID: state.profile.id }), {
        loadPostData,
        updatePosts
    })(UserMenu)
);
