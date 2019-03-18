import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EventField.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <p className={'displayValue'}>{this.props.field.value}</p>
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
}

EventField.propTypes = {
  field: PropTypes.object.isRequired
};
