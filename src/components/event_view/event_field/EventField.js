import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * EventField is a visual element for an event, which receives and displays
 * a field type and value.
 */
export default class EventField extends Component {
  /**************************** Visual component ****************************/

  render() {
    return (
      <p>
        {' '}
        {this.props.fieldType}: {this.props.fieldValue}{' '}
      </p>
    );
  }
}

EventField.propTypes = {
  fieldType: PropTypes.string.isRequired,
  fieldValue: PropTypes.string.isRequired
};
