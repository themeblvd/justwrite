import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAction } from '../store/posts';
import PostList from './PostList';

class Home extends Component {
    componentDidMount() {
        this.props.updateAction('add-new');
    }

    render() {
        return (
            <div className="dashboard-home">
                <PostList />
            </div>
        );
    }
}

export default connect(null, { updateAction })(Home);
