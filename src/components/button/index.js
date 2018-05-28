import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = props => {
    const btnClass = classNames({
        'has-loader': true,
        loading: props.isLoading
    });

    return <button className={btnClass}>{props.children}</button>;
};

// Button.propTypes = {
//     // ... @TODO
// };

export default Button;
