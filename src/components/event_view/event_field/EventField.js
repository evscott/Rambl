import React, { Component } from 'react';

/**
 * EventField is a visual element for an event, which receives and displays
 * a field type and value.
 */
export default class EventField extends Component {
  constructor(props) {
    super(props);
  }

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
