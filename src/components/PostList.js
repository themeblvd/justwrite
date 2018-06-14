import React from 'react';
import { connect } from 'react-redux';
import { endLoading } from '../store/status';
import Post from './Post';
import Loading from './Loading';
import Pagination from './Pagination';

/**
 * Post List Component
 *
 * Displays an the post overview list in the
 * dashboard homepage.
 *
 * @param  {Object}    props
 * @param  {Array}     props.posts     Group os Post objects from WordPress.
 * @param  {String}    props.appStatus Loading status of top-level application.
 * @return {Component}
 */
const PostList = props => {
  if (props.posts === 'no-results') {
    return <p className="no-results">Dagnabit! No posts matched your search query.</p>;
  }

  if (
    !props.posts.length ||
    !props.authors.length ||
    !props.categories.length ||
    !props.tags.length
  ) {
    return <Loading className="post-list-loader" />;
  }

  if (props.appStatus !== 'has-loaded') {
    props.endLoading('app');
  }

  return (
    <div className="post-list">
      <ul>
        {props.posts.map(post => (
          <Post
            key={`post-${post.id}`}
            id={post.id}
            title={post.title.rendered}
            date={post.date}
            author={post.author}
            tags={post.tags}
          />
        ))}
      </ul>
      {props.totalPages > 1 &&
        !props.isSearch && <Pagination total={props.totalPages} current={props.currentPage} />}
    </div>
  );
};

export default connect(
  state => ({
    appStatus: state.status.app,
    posts: state.posts.list,
    authors: state.posts.authors,
    categories: state.posts.categories,
    tags: state.posts.tags,
    totalPages: state.posts.totalPages,
    currentPage: state.posts.currentPage,
    isSearch: !!state.posts.currentSearchTerm
  }),
  { endLoading }
)(PostList);
