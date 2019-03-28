import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * This is a card that allows a user to create a new event from the calendar.
 * It calls the function onCreateEvent, which is a method used by react-big
 * -calendar for creating events.
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
