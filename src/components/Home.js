import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAction } from '../store/posts';
import PostList from './PostList';

/**
 * Dashboard Homepage
 *
 * The homepage displays the post list.
 */
class Home extends Component {
    /**
     * Set the current action to `add-new`.
     *
     * This action determines what the main
     * action button in the dashboard header
     * will do when clicked.
     *
     * Since we're now on the homeage, the
     * button will be starting a new post.
     */
    componentDidMount() {
        this.props.updateAction('add-new');
    }

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        return (
            <div className="dashboard-home">
                <PostList />
            </div>
        );
    }
}

export default connect(null, { updateAction })(Home);
