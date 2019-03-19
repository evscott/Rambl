import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EventField.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDateForUser } from '../../../shared/dateFormatter';

/**
 * EventField is a visual element for an event, which receives and displays
 * a field type and value.
 */
export default class EventField extends Component {
  /**************************** Visual component ****************************/
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

  /**
   * Renders either a text or formatted date field depending on what is being
   * passed into EventField.
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
}

EventField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  editMode: PropTypes.bool.isRequired
};
