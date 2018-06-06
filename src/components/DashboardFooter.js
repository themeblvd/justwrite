import React, { Component } from 'react';
import { showModal } from '../utils/timing';
import Icon from './Icon';
import logo from '../assets/img/logo-dark.svg';

/**
 * Dashboard Footer
 */
class DashboardFooter extends Component {
    /**
     *
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
                    <img src={logo} className="site-logo" />
                </div>
                <div className="item">
                    <span className="copyright">
                        &copy; {new Date().getFullYear()} {'<'}justwrite.app{
                            '>'
                        }{' '}
                        &mdash; A Project by{' '}
                        <a href="https://jasonbobich.com" target="_blank">
                            Jason Bobich
                        </a>.
                    </span>
                </div>
                <div className="item">
                    <ul>
                        <li>
                            <a
                                href="#"
                                value="help"
                                onClick={event =>
                                    this.handleOpenModal(event, 'help')
                                }
                            >
                                Help
                            </a>
                        </li>
                        <li>
                            <a
                                href=""
                                value="privacy"
                                onClick={event =>
                                    this.handleOpenModal(event, 'privacy')
                                }
                            >
                                Privacy
                            </a>
                        </li>
                        <li className="has-icon">
                            <a
                                href="https://github.com/themeblvd/just-write"
                                target="_blank"
                            >
                                <Icon style="fab" icon="github" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default DashboardFooter;
