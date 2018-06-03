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
     */
    componentDidMount() {
        this.postID = 0;
        if (this.props.match.params.id) {
            this.postID = this.props.match.params.id;
            this.props.updateAction('update');
            this.props.loadPost(this.postID);
        } else {
            this.props.updateAction('publish');
        }
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
    }

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        return (
            <div className="dashboard-edit-post">
                {!this.props.post ? (
                    <Loading />
                ) : (
                    <EditPostForm {...this.props.post} />
                )}
            </div>
        );
    }
}

export default connect(state => ({ post: state.posts.current }), {
    updateAction,
    endLoading,
    loadPost,
    clearEditPost
})(EditPost);
