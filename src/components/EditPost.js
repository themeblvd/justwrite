import React, { Component } from 'react';
import { connect } from 'react-redux';
import { endLoading } from '../store/status';
import { updateAction, loadPost, clearEditPost } from '../store/posts';
import Loading from './Loading';
import EditPostForm from './EditPostForm';

/**
 * Edit Post Screen
 *
 * This component provides the top-level interface
 * for editing a post.
 */
class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = { error: '' };
  }

  /**
   * Flag for starting new post.
   *
   * If we're not adding a new post, the Edit Post
   * screen needs to wait for the API to bring back
   * all the data about the post being edited.
   *
   * And if not, <EditPostForm> needs to know it can
   * go ahead and render without any starting data.
   */
  isNewPost = this.props.match.params.id ? false : true;

  /**
   * When mounting, we need to either:
   *
   * 1. If a post ID was given to edit, then set the
   * global action to `update` and load the single
   * post data from the API to fill-in form.
   *
   * 2. If no post ID was given, we're creating a new
   * post. All form fields are blank. Global action is
   * set to `publish`.
   *
   * And after all that, we also need to take care of
   * event listeners for sticking the editor toolbar.
   */
  componentDidMount() {
    // Determine data for editing post, depending on if
    // it's a new post or udpating an existing one.
    this.postID = 0;
    if (this.props.match.params.id) {
      this.postID = this.props.match.params.id;
      this.props.updateAction('update');
      this.props.loadPost(this.postID).catch(error => {
        if (this.props.appStatus !== 'has-loaded') {
          this.props.endLoading('app');
        }
        this.setState({
          error: "The post you're trying to edit wasn't found."
        });
      });
    } else {
      this.isNewPost = true;
      this.props.updateAction('publish');
    }

    // Listen for scroll on desktop only. For desktop, we
    // binds to scroll for dashboard-edit-post.
    window.addEventListener('scroll', this.stickEditorToolbar);

    // And handle the window re-size on all viewports.
    window.addEventListener('resize', this.stickEditorToolbar);
  }

  /**
   * When the component unmounts, clear the current post
   * data.
   *
   * Doing this, ensures that coming back to this comonent
   * will do a refresh API call for the data belonging to
   * the post being edited.
   */
  componentWillUnmount() {
    this.props.clearEditPost();
    window.removeEventListener('resize', this.stickEditorToolbar);
    window.removeEventListener('scroll', this.stickEditorToolbar);
  }

  /**
   * When scrolling, stick the editor's toolbar
   * just below the dashboard header, before it
   * travels outside of the viewport.
   *
   * Note: Remember that in our app, the window
   * doesn't actually scroll, but instead the
   * .dashboard-edit-post DIV does.
   */
  stickEditorToolbar = event => {
    const toolbar = document.querySelector('.editor');
    const rect = toolbar.getBoundingClientRect();
    const headerHeight = 65;

    if (rect.top <= headerHeight) {
      document.body.classList.add('stick-editor-toolbar');
    } else {
      document.body.classList.remove('stick-editor-toolbar');
    }
  };

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    if (this.state.error) {
      return (
        <div className="edit-error">
          <p>{this.state.error}</p>
        </div>
      );
    }

    return (
      <div className="dashboard-edit-post" onScroll={this.stickEditorToolbar}>
        {!this.props.post && !this.isNewPost ? (
          <Loading />
        ) : (
          <EditPostForm {...this.props.post} isNewPost={this.isNewPost} />
        )}
      </div>
    );
  }
}

export default connect(
  state => ({ post: state.posts.current, appStatus: state.status.app }),
  {
    endLoading,
    updateAction,
    loadPost,
    clearEditPost
  }
)(EditPost);
