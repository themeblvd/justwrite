import React, { Component } from 'react';

// Store
import { connect } from 'react-redux';
import { loadProfile } from '../store/profile';
import { loadPostData } from '../store/posts';

// Routing
import { Route, Switch, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { animationDuration } from '../config';

// Components
import DashboardHeader from './DashboardHeader';
import Home from './Home';
import EditPost from './EditPost';
import EditProfile from './EditProfile';
import DashboardFooter from './DashboardFooter';

/**
 * Dashboard
 *
 * This component is responsible for
 * displaying the top-level dashboard.
 */
class Dashboard extends Component {
  /**
   * Pull async data.
   *
   * Once the component has mounted, we can
   * start pulling all the data needed from
   * the separate endpoints of the WordPress site.
   */
  componentDidMount() {
    this.props.loadProfile();
    this.props.loadPostData('authors');
    this.props.loadPostData('categories');
    this.props.loadPostData('tags');
    this.props.loadPostData('posts');
  }

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    return (
      <div className="dashboard-page">
        <DashboardHeader />
        <TransitionGroup component={null}>
          <CSSTransition
            key={this.props.location.key}
            classNames="primary"
            timeout={animationDuration.primaryRouting}
          >
            <Switch location={this.props.location}>
              <Route exact path="/" component={Home} />
              <Route path="/edit/:id" component={EditPost} />
              <Route path="/new/" component={EditPost} />
              <Redirect to="/" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <EditProfile />
        <DashboardFooter />
      </div>
    );
  }
}

export default connect(
  state => ({ appStatus: state.status.app }),
  {
    loadProfile,
    loadPostData
  }
)(Dashboard);
