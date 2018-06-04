import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    loadPostData,
    updateCurrentPage,
    updateCurrentSearchTerm,
    updatePosts
} from '../store/posts';

/**
 * Home Search Field
 *
 * This component displays as a large search box
 * above the main post list on the dashboard homepage.
 */
class PostSearch extends Component {
    /**
     * Handle search input field change.
     */
    handleChange = event => {
        const term = event.target.value;

        this.props.updateCurrentSearchTerm(term);
        this.props.updatePosts({}); // Trigger loader.
        this.props.updateCurrentPage(1);

        if (term) {
            this.props
                .loadPostData('posts', { search: term, per_page: 100 })
                .then(() => {
                    if (!this.props.searchResults.length) {
                        this.props.updatePosts('no-results'); // Breaks loading cycle.
                    }
                });
        } else {
            this.props.loadPostData('posts');
        }
    };

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        return (
            <div className="post-search">
                <input
                    type="search"
                    placeholder="Search posts..."
                    onChange={this.handleChange}
                    value={this.props.searchTerm}
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        searchTerm: state.posts.currentSearchTerm,
        searchResults: state.posts.list
    }),
    {
        loadPostData,
        updateCurrentPage,
        updateCurrentSearchTerm,
        updatePosts
    }
)(PostSearch);
