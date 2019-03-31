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
  /**
   * Generates the notes information to be displayed
   * @return {*} notes icon followed by either the trip notes or a
   * message indicating there are no trip notes
   */
  getNotesDiv() {
    let par = '';
    if (this.props.trip.dscript) {
      par = <p>Notes: {this.props.trip.dscript}</p>;
    } else {
      par = <p>You do not have any notes</p>;
    }
    return (
      <div>
        <FontAwesomeIcon
          size="lg"
          icon={['far', 'star']}
          className="light-blue"
        />
        {par}
      </div>
    );
  }
  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        <p>countdown component here</p>
        <p>until</p>
        <h2>{this.props.trip.name}</h2>
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
