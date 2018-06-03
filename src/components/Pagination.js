import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCurrentPage, clearPosts, loadPostData } from '../store/posts';

/**
 * Pagination
 *
 * Displays the pagination below the post
 * list on the dashboard homepage.
 */
class Pagination extends Component {
    /**
     * Go to page.
     *
     * Each page will require a new api call
     * to retrieve the posts.
     *
     * @param {Event} event
     */
    handleClick = event => {
        var page = event.target.value;
        this.props.updateCurrentPage(event.target.value);
        this.props.clearPosts();
        this.props.loadPostData('posts', { page });
    };

    /**
     * Render pagination buttons.
     *
     * @param  {Number} total   Total number of pages.
     * @param  {Number} current Curreng page number
     * @return {Array}          Components to display.
     */
    buttons = (total, current) => {
        var items = [];

        for (let i = 1; i <= total; i++) {
            let className = current == i ? 'button active' : 'button';

            items.push(
                <li
                    key={`paginate-button-${i}`}
                    value={i}
                    className={className}
                    onClick={this.handleClick}
                >
                    {i}
                </li>
            );
        }

        return items;
    };

    /**
     * Render component.
     *
     * @return {Component}
     */
    render() {
        return (
            <ul className="pagination">
                {this.buttons(this.props.total, this.props.current)}
            </ul>
        );
    }
}

export default connect(null, { updateCurrentPage, clearPosts, loadPostData })(
    Pagination
);
