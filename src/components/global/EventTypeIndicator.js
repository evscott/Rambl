import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * The event type indicator shows what the type of an event is
 * visually (it will represent a plan, accommodation, or
 * transportation event).
 */
export class EventTypeIndicator extends Component {
  render() {
    switch (this.props.type) {
      case 'plan':
        return (
          <FontAwesomeIcon
            size={this.props.size}
            icon={['fas', 'calendar-week']}
            className="plan"
            title="Plan"
          />
        );
      case 'accom':
        return (
          <FontAwesomeIcon
            size={this.props.size}
            icon={['fas', 'hotel']}
            className="accom"
            title="Accommodation"
          />
        );
      case 'trans':
        return (
          <FontAwesomeIcon
            size={this.props.size}
            icon={['fas', 'bus']}
            className="trans"
            title="Transportation"
          />
        );
      default:
        return (
          <FontAwesomeIcon
            size={this.props.size}
            icon={['fas', 'star']}
            className="none"
            title="No type"
          />
        );
    }
  }
}

EventTypeIndicator.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired
};
