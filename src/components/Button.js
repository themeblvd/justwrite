import React, { Component } from 'react';
import classNames from 'classnames';

class Button extends Component {
    render() {
        const classes = classNames({
            'has-loader': true,
            loading: this.props.isLoading,
            primary: this.props.primary
        });

        return (
            <button onClick={this.props.onClick} className={classes}>
                {this.props.children}
            </button>
        );
    }
}

export default Button;
