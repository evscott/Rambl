import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { PriorityIndicator } from '../../../global/PriorityIndicator';
import './AgendaItem.css';
import './ToDoItem.css'; // This is needed for a CSS hack
import { EventTypeIndicator } from '../../../global/EventTypeIndicator';

/**
 * This is the code for a single item displayed on the react-big-calendar
 * to-do list. It displays the title, priority, and event type (no dates).
 */
export class ToDoItem extends Component {
  /**
   * Adds one to the priority of the event by sending the info to the
   * redux store/database. If priority exceeds 2, it wraps down to 0.
   * @param event the event to update priority for.
   */
  incrementPriority(event) {
    event.priority = (event.priority + 1) % 3; // Increment, wrap around
    switch (event.event_type) {
      case 'trans':
        this.props.onUpdateTran(event);
        break;
      case 'plan':
        this.props.onUpdatePlan(event);
        break;
      case 'accom':
        this.props.onUpdateAccom(event);
        break;
      default:
        break;
    }
  }

  render() {
    let { accessors, event } = this.props;

    // Retrieve info in the default way for react-big-calendar
    let title = accessors.title(event);

    // Retrieve specialized info
    let priority = event.priority; // May be null
    let eventType = event.event_type; // May be null

    return (
      <Card>
        <Card.Body>
          <div>
            <span
              className={'clickable'}
              onClick={() => this.props.onSelectEvent(event)}
            >
              <EventTypeIndicator type={eventType} size={'3x'} />
              {title}
            </span>
            <div
              className={'pull-right'}
              onClick={() => this.incrementPriority(event)}
            >
              <PriorityIndicator priority={+priority} />
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

ToDoItem.propTypes = {
  event: PropTypes.object.isRequired, // The event to show
  accessors: PropTypes.object.isRequired, // The accessors to figure out
  // what to show from the event object
  localizer: PropTypes.object.isRequired, // moment (for dealing with dates)
  onSelectEvent: PropTypes.func.isRequired // what to do when selected
};
