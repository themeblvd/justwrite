import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import fecha from 'fecha';

const Post = props => {
    var excerpt = props.content
        .split(' ')
        .filter((word, i) => i <= 25)
        .join(' ');

    return (
        <li id={`post-${props.id}`} className="post">
            <h2 className="post-title">{ReactHtmlParser(props.title)}</h2>
            <span className="post-meta">
                {fecha.format(new Date(props.date), 'longDate')}
            </span>
            <div className="post-excerpt">
                {ReactHtmlParser(excerpt + '...')}
            </div>
        </li>
    );
};

export default Post;
