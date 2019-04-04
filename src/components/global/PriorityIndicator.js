import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * The PriorityIndicator is a displayable icon representing the
 * priority for a given event. It has a varying amount filled and
 * a different color based on the input property "priority" (which
 * is an integer from 0-3, where 0 means unassigned).
 */
export class PriorityIndicator extends Component {
  render() {
    switch (this.props.priority) {
      case 0:
        return (
          <FontAwesomeIcon
            icon={['far', 'star']}
            className="med-icon red"
            title="Low Priority"
          />
        );
      case 1:
        return (
          <FontAwesomeIcon
            icon={['fas', 'star-half-alt']}
            className="med-icon dark-blue"
            title="Medium Priority"
          />
        );
      case 2:
        return (
          <FontAwesomeIcon
            icon={['fas', 'star']}
            className="med-icon yellow"
            title="High Priority"
          />
        );
      default:
        // This case should never be reached, but it's useful for catching bugs
        // down the road (in a pretty way).
        return (
          <FontAwesomeIcon
            size="lg"
            icon={['fas', 'star']}
            className="no-priority"
            title="Priority Undefined"
          />
        );
    }
  }
}

PriorityIndicator.propTypes = {
  priority: PropTypes.number.isRequired // The priority of the item to display
};
