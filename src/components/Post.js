import React, { Component } from 'react';
import { withRouter } from 'react-router';
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
    event.preventDefault();
    this.props.history.push(`edit/${this.props.id}`);
  };

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    return (
      <li id={`post-${this.props.id}`} className="post">
        <a href={`#edit-${this.props.id}`} className="post-link" onClick={this.handleClick}>
          <span className="h2 post-title">{ReactHtmlParser(this.props.title)}</span>
          <span className="post-meta">
            <Meta author={this.props.author} date={this.props.date} />
          </span>
          <span className="post-tags">
            <TagList tags={this.props.tags} />
          </span>
        </a>
      </li>
    );
  }
}

export default withRouter(Post);
