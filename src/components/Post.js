import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ReactHtmlParser from 'react-html-parser';
import fecha from 'fecha';

class Post extends Component {
    handleClick = event => {
        this.props.history.push(`edit/${this.props.id}`);
    };

    render() {
        var excerpt = this.props.content
            .split(' ')
            .filter((word, i) => i <= 25)
            .join(' ');

        return (
            <li
                id={`post-${this.props.id}`}
                className="post"
                onClick={this.handleClick}
            >
                <h2 className="post-title">
                    {ReactHtmlParser(this.props.title)}
                </h2>
                <span className="post-meta">
                    {fecha.format(new Date(this.props.date), 'longDate')}
                </span>
                <div className="post-excerpt">
                    {ReactHtmlParser(excerpt + '...')}
                </div>
            </li>
        );
    }
}

export default withRouter(Post);
