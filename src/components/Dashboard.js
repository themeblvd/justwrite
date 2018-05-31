import React, { Component } from 'react';
import { connect } from 'react-redux';
import { endLoading } from '../store/status';
import { loadProfile } from '../store/profile';
import DashboardHeader from './DashboardHeader';

class Dashboard extends Component {
    componentDidMount() {
        this.props.loadProfile().then(() => {
            // ...
            this.props.endLoading('app');
        });
    }

    render() {
        return (
            <div className="dashboard-page">
                <DashboardHeader />
            </div>
        );
    }
}

export default connect(state => ({ appStatus: state.status.app }), {
    endLoading,
    loadProfile
})(Dashboard);
