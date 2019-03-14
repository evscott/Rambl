import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EventFieldEdit.css';

/**
 * EventField is a visual element for an event, which receives and displays
 * a field type and value.
 */
export default class EventFieldEdit extends Component {
  /**************************** Visual component ****************************/

  render() {
    return (
      <td>
        <b>{this.props.fieldType}</b>
        <p>{this.props.fieldValue}</p>
      </td>
    );
  }
}

EventFieldEdit.propTypes = {
  fieldType: PropTypes.string.isRequired,
  fieldValue: PropTypes.string.isRequired
};
