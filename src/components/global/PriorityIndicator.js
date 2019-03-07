import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PriorityIndicator.css';

/**
 * The PriorityIndicator is a displayable icon representing the
 * priority for a given event. It has a varying amount filled and
 * a different color based on the input property "priority" (which
 * is an integer from 0-3, where 0 means unassigned).
 */
export class PriorityIndicator extends Component {
  render() {
    switch (this.props.priority) {
      case 1:
        return (
          <FontAwesomeIcon
            size="lg"
            icon={['far', 'star']}
            className="low-priority"
            title="Low Priority"
          />
        );
      case 2:
        return (
          <FontAwesomeIcon
            size="lg"
            icon={['fas', 'star-half-alt']}
            className="med-priority"
            title="Medium Priority"
          />
        );
      case 3:
        return (
          <FontAwesomeIcon
            size="lg"
            icon={['fas', 'star']}
            className="hi-priority"
            title="High Priority"
          />
        );
      default:
        return (
          <FontAwesomeIcon
            size="lg"
            icon={['fas', 'star']}
            className="no-priority"
            title="No Priority"
          />
        );
    }
  }
}

PriorityIndicator.propTypes = {
  priority: PropTypes.number.isRequired // The priority of the item to display
};
