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
        <b className={'displayType'}>{this.props.field.type}</b>
        <div>
          {this.renderFieldValue()}
          <button
            className="initEdit"
            onClick={() => this.props.onClick(this.props.field)}
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

  renderFieldValue() {
    if (
      this.props.field.name === 'begin_time' ||
      this.props.field.name === 'end_time'
    ) {
      return (
        <p className={'displayValue'}>
          {formatDateForUser(this.props.field.value)}
        </p>
      );
    } else {
      return <p className={'displayValue'}>{this.props.field.value}</p>;
    }
  }
}

EventField.propTypes = {
  field: PropTypes.object.isRequired
};
