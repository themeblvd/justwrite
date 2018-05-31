import React, { Component } from 'react';
import classNames from 'classnames';

class Button extends Component {
    render() {
        const classes = classNames({
            'has-loader': true,
            loading: this.props.isLoading
        });

        return (
            <button onClick={this.props.handleClick} className={classes}>
                {this.props.children}
            </button>
        );
    }
}

export default Button;
