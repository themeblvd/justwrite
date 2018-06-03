import React, { Component } from 'react';

// Store
import { connect } from 'react-redux';
import { toSave } from '../store/posts';

// Utilities
import classNames from 'classnames';
import TurndownService from 'turndown';
import htmlToDraft from 'html-to-draftjs';
import Showdown from 'showdown';

// Editor Dependencies
import { EditorState, ContentState } from 'draft-js';
import ReactMde, { ReactMdeTypes } from 'react-mde';
import EditorViewToolbar from './EditorViewToolbar';

/**
 * Content Editor
 *
 * Our content editor utilizes `react-mde` by André
 * Pena, which implements `draft-js` by Facebook.
 *
 * This wrapper <Editor> component makes some minor
 * customizations to the `react-mde` like adjusting
 * layout view responsively and allowing the user
 * to toggle between different styled views. It's also
 * been styled to work better as a full-width editor.
 */
class Editor extends Component {
    constructor(props) {
        super(props);

        const turndownService = new TurndownService({ headingStyle: 'atx' });

        const rawHtml = this.props.content;

        const rawMarked = turndownService.turndown(rawHtml);

        const blocksFromHtml = htmlToDraft(rawMarked);

        const { contentBlocks, entityMap } = blocksFromHtml;

        const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
        );

        const draftEditorState = EditorState.createWithContent(contentState);

        this.state = {
            editorState: {
                html: rawHtml,
                markdown: rawMarked,
                draftEditorState: draftEditorState
            },
            layout: window.innerWidth >= 1000 ? 'horizontal' : 'vertical',
            view: localStorage.getItem('editorView')
                ? localStorage.getItem('editorView')
                : 'split' // edit, split, preview
        };

        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true
        });
    }

    /**
     * Add event listener to the window to modify
     * editor's layout setting.
     *
     * The `react-mde` editor takes a layout setting
     * and here we're setting things up so that that
     * option is effected by the size of the current
     * viewport.
     */
    componentDidMount() {
        window.addEventListener('resize', this.handleLayoutChange);
    }

    /**
     * Remove the window event listener when the
     * component unmounts.
     */
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleLayoutChange);
    }

    /**
     * Handle the value (i.e. the content) being changed
     * within the editor.
     *
     * As the markdown content is changed in th editor,
     * we're dispatching the resulting HTML to the store
     * so it's always ready to be PUT to the API (i.e. saved).
     */
    handleValueChange = (editorState: ReactMdeTypes.MdeState) => {
        this.props.toSave('content', editorState.html);
        this.setState({ editorState });
    };

    /**
     * Handles the responsive layout change.
     *
     * When the viewport is at least 1000px, we give `react-mde`
     * the layout `horizontal` which places the editor and preview
     * side-by-side.
     *
     * When the viewport is less than 1000px, we give `react-mde`
     * the layout `vertical` which just stacks the editor and preview.
     */
    handleLayoutChange = event => {
        this.setState({
            layout: event.target.innerWidth >= 1000 ? 'horizontal' : 'vertical'
        });
    };

    /**
     * Handles changing the view.
     *
     * Not to be confused with the layout, the view applies TO the
     * layout seen at 1000px viewport and greater.
     *
     * Using the <EditorViewToolbar> component, the user can toggle
     * between three views:
     *
     * 1. Edit    - Editor only, centered on screen.
     * 2. Split   - Default. Editor and Preview, side-by-side.
     * 3. Preview - Preview only, centered on screen.
     *
     * Note: The view selected by the user is saved to local storage
     * so that their preferred visual state is preserved.
     */
    handleViewChange = view => {
        this.setState({ view });
        localStorage.setItem('editorView', view);
    };

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        return (
            <div
                className={classNames({
                    editor: true,
                    [`view-${this.state.view}`]: true
                })}
            >
                <EditorViewToolbar
                    current={this.state.view}
                    handleChange={this.handleViewChange}
                />
                <ReactMde
                    layout={this.state.layout}
                    onChange={this.handleValueChange}
                    editorState={this.state.editorState}
                    generateMarkdownPreview={markdown =>
                        Promise.resolve(this.converter.makeHtml(markdown))
                    }
                />
            </div>
        );
    }
}

export default connect(null, { toSave })(Editor);
