import React, { Component } from 'react';
import { showModal } from '../utils/timing';
import { copyright } from '../utils/formatting';
import Icon from './Icon';
import logo from '../assets/img/logo-dark.svg';

/**
 * Dashboard Footer
 */
class DashboardFooter extends Component {
  /**
   * Open a information modal, when corresponding
   * link is clicked.
   */
  handleOpenModal = (event, type) => {
    event.preventDefault();
    showModal(type);
  };

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    return (
      <div className="dashboard-footer">
        <div className="item">
          <img src={logo} className="site-logo" alt="Logo for Just Write" />
        </div>
        <div className="item">
          <span className="copyright" dangerouslySetInnerHTML={{ __html: copyright() }} />
        </div>
        <div className="item">
          <ul>
            <li>
              <a href="#help" value="help" onClick={event => this.handleOpenModal(event, 'help')}>
                Help
              </a>
            </li>
            <li>
              <a
                href="#privacy"
                value="privacy"
                onClick={event => this.handleOpenModal(event, 'privacy')}
              >
                Privacy
              </a>
            </li>
            <li className="has-icon">
              <a
                href="https://github.com/themeblvd/justwrite"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon type="fab" icon="github" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default DashboardFooter;
