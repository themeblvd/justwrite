import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeNotification } from '../store/status';
import { timeoutPromise } from '../utils/timing';

/**
 * Global Notification
 *
 * The store holds a single top-level notification
 * for the application.
 *
 * When populated, this component will get mounted,
 * and then unmounted after it's been on the screen
 * long enough to be read.
 *
 * Once seen, the notification will then be removed
 * from the store.
 */
class Notification extends Component {
    /**
     * Once the component has mounted, it will
     * animate, display, and then remove itself.
     */
    componentDidMount() {
        const elem = document.getElementById('app-notification');

        timeoutPromise(10)
            .then(() => {
                elem.classList.add('show');
                return timeoutPromise(250);
            })
            .then(() => {
                elem.classList.add('apply-check');
                return timeoutPromise(2000);
            })
            .then(() => {
                elem.classList.add('hide');
                return timeoutPromise(250);
            })
            .then(() => {
                this.props.removeNotification();
            });
    }

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        const { type, message } = this.props;
        return (
            <div id="app-notification" className={`notification ${type}`}>
                <p>{message}</p>
                {type == 'success' && (
                    <div className="circle">
                        <div className="checkmark draw" />
                    </div>
                )}
            </div>
        );
    }
}

export default connect(
    state => ({
        type: state.status.notification.type,
        message: state.status.notification.message
    }),
    { removeNotification }
)(Notification);
