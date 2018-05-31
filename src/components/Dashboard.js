import React, { Component } from 'react';

// Store
import { connect } from 'react-redux';
import { endLoading } from '../store/status';
import { loadProfile } from '../store/profile';
import { loadPosts } from '../store/posts';

// Routing
import { Route, Switch, Redirect } from 'react-router-dom';

// Components
import DashboardHeader from './DashboardHeader';
import Home from './Home';
import EditPost from './EditPost';

class Dashboard extends Component {
    componentDidMount() {
        this.props
            .loadProfile()
            .then(() => {
                return this.props.loadPosts();
            })
            .then(() => {
                this.props.endLoading('app');
            });
    }

    render() {
        return (
            <div className="dashboard-page">
                <DashboardHeader />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/edit/:id" component={EditPost} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default connect(state => ({ appStatus: state.status.app }), {
    endLoading,
    loadProfile,
    loadPosts
})(Dashboard);
