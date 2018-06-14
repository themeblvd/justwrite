import React from 'react';
import Icon from './Icon';

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
      <li className={props.current === 'edit' ? 'active' : ''}>
        <a
          href="#view-edit"
          title="Edit View"
          onClick={event => {
            event.preventDefault();
            props.handleChange('edit');
          }}
        >
          <Icon icon="pencil-alt" />
        </a>
      </li>
      <li className={props.current === 'split' ? 'active' : ''}>
        <a
          title="Split View"
          href="#view-split"
          onClick={event => {
            event.preventDefault();
            props.handleChange('split');
          }}
        >
          <Icon icon="columns" />
        </a>
      </li>
      <li className={props.current === 'preview' ? 'active' : ''}>
        <a
          title="Preview View"
          href="#view-preview"
          onClick={event => {
            event.preventDefault();
            props.handleChange('preview');
          }}
        >
          <Icon icon="eye" />
        </a>
      </li>
    </ul>
  );
};

export default EditorViewToolbar;
