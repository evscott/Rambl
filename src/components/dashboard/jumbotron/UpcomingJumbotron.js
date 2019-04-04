import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HighlightsContainer from './HighlightsContainer';
import Notes from './Notes';
import CountdownContainer from './CountdownContainer';
/**
 *  UpcomingJumbotron displays when the user has at least one upcoming
 *  trip and no ongoing trips. It features a countdown to the next trip,
 *  highlights, notes, and stats
 */

export default class UpcomingJumbotron extends Component {
  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        <CountdownContainer />
        <p>until</p>
        <h2>{this.props.trip.name}</h2>

        <div className="flex-wrap-center">
          {/* Highlights */}
          <div className="jumbo-component">
            <HighlightsContainer id={this.props.trip.trip_id} />
          </div>

          {/* Notes */}
          <div className="jumbo-component">
            <Notes notes={this.props.trip.dscript} />
          </div>

          {/* Stats */}
          <div className="jumbo-component">
            <div className="icon-padding">
              <FontAwesomeIcon className="med-icon red" icon="chart-bar" />
            </div>
            <p>Stats component here</p>
          </div>
        </div>
      </div>
    );
  }
}
