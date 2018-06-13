import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  loadPostData,
  savePost,
  publishNewPost,
  updateCurrentPage,
  updateCurrentSearchTerm
} from '../store/posts';
import { addNotification, removeNotification } from '../store/status';
import Button from './Button';

/**
 * Action Menu Component
 *
 * These buttons display in the dashboard header
 * and allow the user to take primary and secondary
 * dashboard actions.
 */
class ActionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { doingAction: false };
  }

  /**
   * Go back to dashboard home, when clicking
   * the "Back" button.
   */
  handleGoBack = () => {
    this.props.history.push('/');
  };

  /**
   * Handle the primary action.
   *
   * The primary action button's action will
   * depend on where we're at in the dashboard.
   * These are the potential actions:
   *
   * 1. `add-new` - Create a new post, when at dashboard home.
   * 2. `update`  - Publish a new post, when being edited.
   * 3. `publish` - Update an existing post, when being edited.
   */
  handlePrimaryAction = () => {
    // Make sure post has a title before trying to save/publish.
    if (this.props.action == 'update' || this.props.action == 'publish') {
      if (!this.props.toSave.title) {
        this.props.addNotification('Your post must have a title.', 'error');
        return;
      }
    }

    switch (this.props.action) {
      /*
       * Update existing post.
       */
      case 'update':
        this.setState({ doingAction: true });
        this.props.removeNotification(); // Just in case user hits Update again right away.

        this.props
          .savePost(this.props.toSave)
          .then(() => {
            this.props.updateCurrentPage(1);
            this.props.updateCurrentSearchTerm('');
            this.props.loadPostData('posts');
            this.setState({ doingAction: false });
            this.props.addNotification('Post updated successfully.', 'success');
          })
          .catch(error => {
            this.setState({ doingAction: false });
            this.props.addNotification(`Post updated failed. ${error.message}`, 'error');
          });

        break;

      /*
       * Publish new post.
       */
      case 'publish':
        this.setState({ doingAction: true });
        this.props.removeNotification(); // Just in case user hits Update again right away.

        this.props
          .publishNewPost(this.props.toSave)
          .then(response => {
            const postID = response.data.id;
            this.props.updateCurrentPage(1);
            this.props.updateCurrentSearchTerm('');
            this.props.loadPostData('posts');
            this.setState({ doingAction: false });
            this.props.history.push(`/edit/${postID}`);
            this.props.addNotification('New post published successfully.', 'success');
          })
          .catch(error => {
            this.setState({ doingAction: false });
            this.props.addNotification(`Post creation failed. ${error.message}`, 'error');
          });
        break;

      /*
       * Redirect to new post screen.
       */
      default:
        this.props.history.push('/new');
    }
  };

  /**
   * Depending on the current primary action to be
   * taken, determine the text of the primary action
   * button.
   *
   * @param  {String} action Current action, to be taken when button is clicked.
   * @return {String}        Button text.
   */
  btnText = action => {
    switch (action) {
      case 'update':
        return 'Update';
      case 'publish':
        return 'Publish';
      default:
        return 'New Post';
    }
  };

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    return (
      <ul className="action-menu">
        {(this.props.action == 'update' || this.props.action == 'publish') && (
          <li>
            <Button onClick={this.handleGoBack}>Go Back</Button>
          </li>
        )}
        <li>
          <Button onClick={this.handlePrimaryAction} isLoading={this.state.doingAction} isPrimary>
            {this.btnText(this.props.action)}
          </Button>
        </li>
      </ul>
    );
  }
}

export default withRouter(
  connect(
    state => ({ action: state.posts.action, toSave: state.posts.toSave }),
    {
      loadPostData,
      savePost,
      publishNewPost,
      updateCurrentPage,
      updateCurrentSearchTerm,
      addNotification,
      removeNotification
    }
  )(ActionMenu)
);
