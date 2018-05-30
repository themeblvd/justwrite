import React from 'react';
import classNames from 'classnames';

const Button = props => {
    const classes = classNames({
        'has-loader': true,
        loading: props.isLoading
    });

    return <button className={classes}>{props.children}</button>;
};

export default Button;
