import React, { Component } from 'react';
import { connect } from 'react-redux';
import { animationDuration } from '../config';
import { updateProfile, saveProfile } from '../store/profile';
import { addNotification, removeNotification } from '../store/status';
import Icon from './Icon';
import Button from './Button';

/**
 * Edit Profile Modal
 */
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false };
    }

    /**
     * Close the modal window.
     */
    handleClose = event => {
        event.preventDefault();
        const elem = document.getElementById('edit-profile');
        elem.classList.add('animate-out');
        setTimeout(() => {
            elem.classList.remove('animate-in', 'animate-out', 'show');
        }, animationDuration.fadeProfile);
    };

    /**
     * Handle sending the API request from
     * the store, when the form is submitted.
     */
    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isLoading: true });

        this.props
            .saveProfile(this.props.id, {
                first_name: this.props.first_name,
                last_name: this.props.last_name,
                email: this.props.email,
                url: this.props.url,
                description: this.props.description
            })
            .then(() => {
                this.setState({ isLoading: false });
                this.props.addNotification(
                    'Profile saved successfully.',
                    'success'
                );
            });
    };

    /**
     * Handle syncing input changes with
     * the store.
     */
    handleChange = event => {
        const { name, value } = event.target;
        this.props.updateProfile({
            ...this.props,
            [name]: value
        });
    };

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        const {
            id,
            first_name,
            last_name,
            email,
            url,
            description,
            avatar
        } = this.props;

        return (
            <div id="edit-profile" className="edit-profile">
                <div className="wrap">
                    <header>
                        <img className="avatar" src={avatar} />
                        <h2>Edit Profile</h2>
                    </header>
                    <a
                        href="#"
                        onClick={this.handleClose}
                        className="close-btn"
                    >
                        <Icon icon="times" />
                    </a>
                    <form onSubmit={this.handleSubmit}>
                        <p className="half">
                            <label htmlFor="first-name">First Name</label>
                            <input
                                id="first-name"
                                type="text"
                                name="first_name"
                                value={first_name}
                                onChange={this.handleChange}
                            />
                        </p>
                        <p className="half">
                            <label htmlFor="last-name">Last Name</label>
                            <input
                                id="last-name"
                                type="text"
                                name="last_name"
                                value={last_name}
                                onChange={this.handleChange}
                            />
                        </p>
                        <p className="half">
                            <label htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                type="text"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                            />
                        </p>
                        <p className="half">
                            <label htmlFor="url">Personal Website</label>
                            <input
                                id="url"
                                type="text"
                                name="url"
                                value={url}
                                onChange={this.handleChange}
                            />
                        </p>
                        <p>
                            <label htmlFor="description">Bio</label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={this.handleChange}
                            />
                        </p>
                        <input type="hidden" value={id} />
                        <Button isLoading={this.state.isLoading} isPrimary>
                            Save
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(state => ({ ...state.profile }), {
    updateProfile,
    saveProfile,
    addNotification,
    removeNotification
})(EditProfile);
