import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';

class PostList extends Component {
    render() {
        if (!this.props.posts.length) {
            return <div className="no-posts">No posts to display.</div>;
        }

        return (
            <div className="post-list">
                <ul>
                    {this.props.posts.map(post => (
                        <Post
                            key={`post-${post.id}`}
                            id={post.id}
                            title={post.title.rendered}
                            content={post.content.raw}
                            date={post.date}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default connect(state => ({ posts: state.posts.list }))(PostList);
