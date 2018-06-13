import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadPostData, updateFilteredBy, updatePostsQuery, updatePosts } from '../store/posts';
import { showModal } from '../utils/timing';
import LogoutLink from './LogoutLink';
import Icon from './Icon';

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
    showModal('profile');
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

    var query = { author: this.props.userID };

    this.props.updateFilteredBy('my-posts');
    this.props.updatePostsQuery(query);
    this.props.updatePosts({}); // Trigger loader within post list.
    this.props.loadPostData('posts', query);
  };

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    return (
      <div className="user-menu">
        <a href="#" className="close-sub-menu" onClick={this.props.handleClose}>
          <Icon icon="times" className="close-sub-menu" />
        </a>
        <ul>
          <li>
            <a href="#" onClick={this.handleShowPosts}>
              <Icon icon="file-alt" />My Posts
            </a>
          </li>
          <li>
            <a href="#" onClick={this.handleShowProfile}>
              <Icon icon="user" />Edit Profile
            </a>
          </li>
          <li>
            <a href={this.props.website} target="_blank">
              <Icon icon="external-link-alt" />View Website
            </a>
          </li>
          <li>
            <LogoutLink>
              <Icon icon="sign-out-alt" />Log Out
            </LogoutLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({ userID: state.profile.id }),
    {
      loadPostData,
      updateFilteredBy,
      updatePostsQuery,
      updatePosts
    }
  )(UserMenu)
);
