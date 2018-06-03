import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toSave } from '../store/posts';
import { endLoading } from '../store/status';
import Editor from './Editor';
import FontAwesomeIcon from './FontAwesomeIcon';

/**
 * Edit Post Form
 *
 * This provides the entire interface to edit the
 * content and options of a post.
 *
 * It should only be mounted once the information for
 * the current post being edited has been retrieved
 * from the API call.
 */
class EditPostForm extends Component {
    /**
     * Component constructor.
     */
    constructor(props) {
        super(props);
        this.state = { isDataReady: false };
    }

    /**
     * Update store.
     *
     * When the component mounts, all of the post data
     * for the form is added to the store, where it will
     * be controlled from.
     */
    componentDidMount() {
        this.props.toSave('id', this.props.id);
        this.props.toSave('title', this.props.title.raw);
        this.props.toSave('content', this.props.content.raw);
        this.props.toSave('excerpt', this.props.excerpt.raw);
        // @TODO Post settings. => toSave()
        this.props.endLoading('app');
        this.setState({ isDataReady: true });
    }

    /**
     * Do nothing if form submit is triggered by a user
     * action like clicking enter.
     *
     * Form submission is handled from <ActionMenu> in the
     * dashboard header, pulling data from  the store, where
     * inputs are controlled from.
     */
    handleSubmit = event => {
        event.preventDefault();
    };

    /**
     * On input change, save the new value to the store.
     */
    handleChange = event => {
        const { name, value } = event.target;
        this.props.toSave(name, value);
    };

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        return (
            <form name="post" onSubmit={this.handleSubmit}>
                <input name="id" type="hidden" value={this.props.inputs.id} />
                <div className="field title-field">
                    <input
                        name="title"
                        className="post-title"
                        type="text"
                        placeholder="Post Title"
                        value={this.props.inputs.title}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="field permalink-field">
                    <FontAwesomeIcon icon="external-link-alt" />
                    <a href={this.props.link} target="_blank">
                        {this.props.link}
                    </a>
                </div>
                <div className="field content-field">
                    {this.state.isDataReady && (
                        <Editor content={this.props.inputs.content} />
                    )}
                </div>
                <div className="field excerpt-field">
                    <label>Excerpt</label>
                    <textarea
                        name="excerpt"
                        className="post-excerpt"
                        value={this.props.inputs.excerpt}
                        onChange={this.handleChange}
                    />
                </div>
            </form>
        );
    }
}

export default connect(
    state => ({
        inputs: {
            ...state.posts.toSave
        }
    }),
    { toSave, endLoading }
)(EditPostForm);
