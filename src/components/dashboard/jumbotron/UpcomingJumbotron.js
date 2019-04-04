import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HighlightsContainer from './HighlightsContainer';
import Notes from './Notes';
import CountdownContainer from './CountdownContainer';
import { Link } from 'react-router-dom';
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
        <Link
          to={'/trip?id=' + this.props.trip.trip_id + '&view=month&filter=all'}
        >
          <h2>{this.props.trip.name}</h2>
        </Link>

        <div className="flex-wrap-center">
          {/* Highlights */}
          <div className="jumbo-component">
            <HighlightsContainer id={this.props.trip.trip_id} />
          </div>

          {/* Notes */}
          <div className="jumbo-component">
            <Notes dscript={this.props.trip.dscript} />
          </div>

          {/* Stats */}
          <div className="jumbo-component">
            <div className="icon-padding">
              <FontAwesomeIcon className="med-icon red" icon="chart-bar" />
            </div>
            <p>Stats component here</p>
          </div>
        </div>

        <svg
          id="wave-border"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-300 0 950 270"
        >
          <path
            d="M-314,267 C105,364 400,100 812,279"
            fill="none"
            stroke="#f0f0f0"
            stroke-width="120"
            stroke-linecap="round"
          />
        </svg>
      </div>
    );
  }
}
