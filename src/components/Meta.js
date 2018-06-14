import React from 'react';
import { connect } from 'react-redux';
import fecha from 'fecha';

/**
 * Meta info for individual post.
 *
 * @param  {Object}    props            Component props.
 * @param  {Number}    props.author     Post author ID.
 * @param  {Object}    props.authorData All author data from store.
 * @param  {String}    props.date       Post publish date.
 * @return {Component}
 */
const Meta = props => {
  const date = fecha.format(new Date(props.date), 'shortDate');
  const author = props.authorData.find(author => author.id === props.author);

  return (
    <p>
      {author && `By ${author.name}`} on {date}
    </p>
  );
};

export default connect(state => ({ authorData: state.posts.authors }))(Meta);
