import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Meta from './Meta';
import TagList from './TagList';

/**
 * Individual post component.
 *
 * Displays an individual component within the
 * post overview list in the dashboard homepage.
 */
class Post extends Component {
  /**
   * When a post in the list is clicked, redirect
   * to editing that post.
   *
   * @param {Event} event
   */
  handleClick = event => {
    this.props.history.push(`edit/${this.props.id}`);
  };

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    return (
      <li id={`post-${this.props.id}`} className="post" onClick={this.handleClick}>
        <h2 className="post-title">{ReactHtmlParser(this.props.title)}</h2>
        <div className="post-meta">
          <Meta author={this.props.author} date={this.props.date} />
        </div>
        <div className="post-tags">
          <TagList tags={this.props.tags} />
        </div>
      </li>
    );
  }
}

export default withRouter(Post);
