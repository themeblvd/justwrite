import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPostData, updatePosts } from '../store/posts';

/**
 * Post List Filter
 *
 * This component filters the posts on the dashboard
 * homepage by category.
 */
class PostFilter extends Component {
    constructor(props) {
        super(props);
        this.state = { current: '' };
    }

    /**
     * Handle click for category change.
     *
     * For each category selected, a new API request is made
     * to retrieve those posts.
     *
     * Because only category selections are displayed that
     * contain posts, we don't account for no posts coming
     * back from a request... although we probably should.
     */
    handleClick = event => {
        var categoryID = event.target.value;

        this.setState({ current: categoryID });
        this.props.updatePosts({}); // Trigger loader.

        if (categoryID) {
            this.props.loadPostData('posts', { categories: categoryID });
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
        var { categories, isSearch } = this.props;

        categories = categories.filter(category => category.count > 0);

        return (
            <div className="filter-menu">
                {categories.length &&
                    !isSearch && (
                        <ul>
                            <li
                                value=""
                                onClick={this.handleClick}
                                className={!this.state.current ? 'active' : ''}
                            >
                                All Categories
                            </li>
                            {categories.map(category => {
                                return (
                                    <li
                                        key={`category-${category.id}`}
                                        value={category.id}
                                        onClick={this.handleClick}
                                        className={
                                            this.state.current == category.id
                                                ? 'active'
                                                : ''
                                        }
                                    >
                                        {category.name}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
            </div>
        );
    }
}

export default connect(
    state => ({
        categories: state.posts.categories,
        isSearch: !!state.posts.currentSearchTerm
    }),
    {
        loadPostData,
        updatePosts
    }
)(PostFilter);
