import React, { Component } from 'react';
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
    if (
        !props.posts.length ||
        !props.authors.length ||
        !props.categories.length ||
        !props.tags.length
    ) {
        return <Loading className="post-list-loader" />;
    }

    if (props.appStatus != 'has-loaded') {
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
                        excerpt={post.excerpt.raw}
                        date={post.date}
                        author={post.author}
                        tags={post.tags}
                    />
                ))}
            </ul>
            <Pagination />
        </div>
    );
};

export default connect(
    state => ({
        appStatus: state.status.app,
        posts: state.posts.list,
        authors: state.posts.authors,
        categories: state.posts.categories,
        tags: state.posts.tags
    }),
    { endLoading }
)(PostList);
