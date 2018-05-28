import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { rippleDelay } from '../../config';

class Button extends Component {
    constructor() {
        super();
        this.state = {
            className: 'ripple',
            ripplePosX: '0px',
            ripplePosY: '0px'
        };
    }

    handleClick = event => {
        if (this.props.handleClick) {
            this.props.handleClick();
        }

        if (this.state.className.includes('animating')) {
            return;
        }

        var x = event.clientX - event.target.offsetLeft,
            y = event.clientY - event.target.offsetTop;

        this.setState({
            ripplePosX: x,
            ripplePosY: y
        });

        setTimeout(() => {
            this.setState({
                className: 'ripple animating'
            });
        }, 1);

        setTimeout(() => {
            this.setState({
                className: 'ripple'
            });
        }, rippleDelay);
    };

    render() {
        return (
            <button className={this.state.className} onClick={this.handleClick}>
                {this.props.children}
                <span
                    style={{
                        top: this.state.ripplePosY,
                        left: this.state.ripplePosX
                    }}
                />
            </button>
        );
    }
}

Button.propTypes = {
    handleClick: PropTypes.func
};

export default Button;
