import React, { Component } from 'react';
import classNames from 'classnames';
import { hideModal } from '../utils/timing';
import InfoHelp from './InfoHelp';
import InfoPrivacy from './InfoPrivacy';
import Icon from './Icon';

/**
 * Information Modal
 *
 * This component displays an informational page,
 * from a given markdown file.
 */
class InfoModal extends Component {
  /**
   * Close the modal.
   */
  handleCloseModal = (event, type) => {
    event.preventDefault();
    hideModal(type);
  };

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    var page;
    switch (this.props.id) {
      case 'help':
        page = <InfoHelp />;
        break;
      case 'privacy':
        page = <InfoPrivacy />;
        break;
    }

    return (
      <div className={`modal info-modal ${this.props.id}`}>
        <div className="wrap">
          <a
            href="#"
            onClick={event => this.handleCloseModal(event, this.props.id)}
            className="close-btn"
          >
            <Icon icon="times" />
          </a>
          {page}
        </div>
      </div>
    );
  }
}

export default InfoModal;
