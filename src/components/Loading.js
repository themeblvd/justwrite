import React from 'react';
import classNames from 'classnames';

/**
 * Loader Component
 *
 * While styled for different locations, this
 * is a universal loader component for the
 * application.
 *
 * @param  {Object}    props           Component props.
 * @param  {String}    props.className CSS classes.
 * @return {Component}
 */
const Loading = props => {
    const classes = classNames('loader', props.className);

    return (
        <div className={classes}>
            <span />
        </div>
    );
};

export default Loading;
