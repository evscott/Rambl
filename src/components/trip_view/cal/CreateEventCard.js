import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * This is the code for a single item displayed on the react-big-calendar
 * to-do list. It displays the title, priority, and event type (no dates).
 */
export class CreateEventCard extends Component {
  render() {
    return (
      <Card
        onClick={() => this.props.onCreateEvent({ start: null, end: null })}
      >
        <Card.Body>
          <FontAwesomeIcon
            size="lg"
            icon={['fas', 'plus-square']}
            title="New Event"
          />
          Create a new event
        </Card.Body>
      </Card>
    );
  }
}

CreateEventCard.propTypes = {
  onCreateEvent: PropTypes.func.isRequired
};
