import React from 'react';
import FontAwesomeIcon from './FontAwesomeIcon';

/**
 * View Toolbar
 *
 * This component toggles our custom styled
 * views of the content editor.
 *
 * @param  {Object}    props
 * @param  {String}    props.current      Current view, `edit`, `split`, or `preview`.
 * @param  {Function}  props.handleChange Handles changing view in parent Editor component.
 * @return {Component}
 */
const EditorViewToolbar = props => {
    return (
        <ul className="view-toolbar">
            <li className={props.current == 'edit' ? 'active' : ''}>
                <a
                    href="#"
                    title="Edit View"
                    onClick={event => {
                        event.preventDefault();
                        props.handleChange('edit');
                    }}
                >
                    <FontAwesomeIcon icon="pencil-alt" />
                </a>
            </li>
            <li className={props.current == 'split' ? 'active' : ''}>
                <a
                    title="Split View"
                    href="#"
                    onClick={event => {
                        event.preventDefault();
                        props.handleChange('split');
                    }}
                >
                    <FontAwesomeIcon icon="columns" />
                </a>
            </li>
            <li className={props.current == 'preview' ? 'active' : ''}>
                <a
                    title="Preview View"
                    href="#"
                    onClick={event => {
                        event.preventDefault();
                        props.handleChange('preview');
                    }}
                >
                    <FontAwesomeIcon icon="eye" />
                </a>
            </li>
        </ul>
    );
};

export default EditorViewToolbar;
