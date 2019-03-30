import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HighlightsContainer from './HighlightsContainer';

/**
 *  UpcomingJumbotron displays when the user has at least one upcoming
 *  trip and no ongoing trips. It features a countdown to the next trip,
 *  highlights, notes, and stats
 */

export default class UpcomingJumbotron extends Component {
  /**************************** Helper functions ****************************/
  getNotesDiv() {
    let div = (
      <div>
        <FontAwesomeIcon
          size="lg"
          icon={['far', 'star']}
          className="light-blue"
        />
      </div>
    );
    if (this.props.trip.dscript) {
      div += (
        <div>
          <p>Notes: {this.props.trip.dscript}</p>
        </div>
      );
    } else {
      div += (
        <div>
          <p>You do not have any notes</p>
        </div>
      );
    }
    return div;
  }
  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        <p>countdown component here</p>
        <p>until</p>
        <h2>{this.props.trip ? this.props.trip.name : false}</h2>
        <div className="flex-wrap-center">
          {/* Highlights */}
          <div className="jumbo-component">
            <HighlightsContainer id={this.props.trip.trip_id} />
          </div>
          {/* Notes */}
          <div className="jumbo-component">{this.getNotesDiv()}</div>
          {/* Stats */}
          <div className="jumbo-component">
            <FontAwesomeIcon size="lg" icon={['far', 'star']} className="red" />
            <p>Stats component here</p>
          </div>
        </div>
      </div>
    );
  }
}
