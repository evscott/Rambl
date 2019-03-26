import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EventFieldView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDateForUser } from '../../../../shared/dateFormatter';

/**
 * EventFieldView is a visual element for an event, which receives and displays
 * a field type and value.
 */
export default class EventFieldView extends Component {
  /**************************** Visual component ****************************/

  /**
   * Renders either a text or formatted date field depending on what is being
   * passed into EventFieldView.
   * @returns {*} the event field to be displayed.
   */
  renderFieldValue() {
    if (this.props.name === 'begin_time' || this.props.name === 'end_time') {
      return (
        <p className={'displayValue'}>{formatDateForUser(this.props.value)}</p>
      );
    } else {
      return <p className={'displayValue'}>{this.props.value}</p>;
    }
  }

  render() {
    return (
      <td>
        <b className={'displayType'}>{this.props.type}</b>
        <div>
          {this.renderFieldValue()}
          <button
            className="initEdit"
            onClick={() =>
              this.props.onEdit(
                this.props.name,
                this.props.type,
                this.props.value,
                this.props.editMode
              )
            }
          >
            <b className="initEdit initEditTxt">Edit</b>
            <FontAwesomeIcon
              className="initEdit initEditBtn"
              size="sm"
              icon={['fas', 'pencil-alt']}
            />
          </button>
        </div>
      </td>
    );
  }
}

EventFieldView.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  editMode: PropTypes.bool.isRequired
};
