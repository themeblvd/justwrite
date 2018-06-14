import React from 'react';
import classNames from 'classnames';

/**
 * Button
 *
 * @param  {Object}    props           Component props.
 * @param  {Boolean}   props.isLoading Whether button has loading animation state.
 * @param  {Boolean}   props.isPrimary Whether button has primary styling.
 * @param  {Function}  props.onClick   Button click handler.
 * @return {Component}
 */
const Button = props => {
  const classes = classNames({
    button: true,
    'has-loader': true,
    loading: props.isLoading,
    primary: props.isPrimary
  });

  return (
    <button onClick={props.onClick} className={classes}>
      {props.children}
    </button>
  );
};

export default Button;
