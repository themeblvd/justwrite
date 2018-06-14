import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCurrentPage, clearPosts, updatePostsQuery, loadPostData } from '../store/posts';

/**
 * Pagination
 *
 * Displays the pagination below the post
 * list on the dashboard homepage.
 */
class Pagination extends Component {
  /**
   * Go to page.
   *
   * Each page will require a new api call
   * to retrieve the posts.
   *
   * @param {Number} page Current page number.
   */
  handleClick = page => {
    var query = {
      ...this.props.currentQuery,
      page
    };

    this.props.clearPosts();
    this.props.updatePostsQuery(query);
    this.props.updateCurrentPage(page);
    this.props.loadPostData('posts', query);
  };

  /**
   * Render pagination buttons.
   *
   * @param  {Number} total   Total number of pages.
   * @param  {Number} current Curreng page number
   * @return {Array}          Components to display.
   */
  buttons = (total, current) => {
    var items = [];

    for (let i = 1; i <= total; i++) {
      let className = current === i ? 'active' : '';

      items.push(
        <li key={`paginate-button-${i}`} className={className}>
          <button onClick={() => this.handleClick(i)}>{i}</button>
        </li>
      );
    }

    return items;
  };

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    return <ul className="pagination">{this.buttons(this.props.total, this.props.current)}</ul>;
  }
}

export default connect(
  state => ({ currentQuery: state.posts.query }),
  {
    updateCurrentPage,
    clearPosts,
    updatePostsQuery,
    loadPostData
  }
)(Pagination);
