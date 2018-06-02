import React from 'react';
import { connect } from 'react-redux';

/**
 * List tags of a post.
 *
 * @param  {Object}    props         Component props.
 * @param  {Object}    props.tagData All tag data from store.
 * @param  {Array}     props.tags    Tag IDs for current list.
 * @return {Component}
 */
const TagList = props => {
    return (
        <ul className="tag-list">
            {props.tags.map(tagID => {
                let tag = props.tagData.find(tag => tag.id === tagID);
                if (tag) {
                    return <li key={`tag-${tagID}`}>{tag.slug}</li>;
                }
            })}
        </ul>
    );
};

export default connect(state => ({ tagData: state.posts.tags }))(TagList);
