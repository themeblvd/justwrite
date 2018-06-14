import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPostData, updateFilteredBy, updatePostsQuery, updatePosts } from '../store/posts';

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
  handleClick = value => {
    this.props.updateFilteredBy(value); // Updates this.props.current.
    this.props.updatePosts({}); // Trigger loader.

    var query = {};

    if (value) {
      if (value === 'my-posts') {
        query.author = this.props.userID;
      } else {
        query.categories = value;
      }
    }

    this.props.updatePostsQuery(query);
    this.props.loadPostData('posts', query);
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
              <li className={!this.props.current ? 'active' : ''}>
                <button onClick={() => this.handleClick('')}>All Posts</button>
              </li>
              <li className={this.props.current === 'my-posts' ? 'active' : ''}>
                <button onClick={() => this.handleClick('my-posts')}>My Posts</button>
              </li>
              {categories.map(category => {
                return (
                  <li
                    key={`category-${category.id}`}
                    className={this.props.current === category.id ? 'active' : ''}>
                    <button onClick={() => this.handleClick(category.id)}>{category.name}</button>
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
    current: state.posts.filteredBy,
    categories: state.posts.categories,
    isSearch: !!state.posts.currentSearchTerm,
    userID: state.profile.id
  }),
  {
    loadPostData,
    updateFilteredBy,
    updatePostsQuery,
    updatePosts
  }
)(PostFilter);
