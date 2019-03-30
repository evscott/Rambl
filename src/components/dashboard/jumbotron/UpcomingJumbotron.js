import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CountdownContainer from  './CountdownContainer';
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
        <CountdownContainer/>
        <p>until</p>
        <h2>{this.props.trip != null ? this.props.trip.name : false}</h2>
        <div className="flex-wrap-center">
          <div className="jumbo-component">
            <FontAwesomeIcon
              size="lg"
              icon={['far', 'star']}
              className="yellow"
            />
            <p>Highlight component here</p>
          </div>
          <div className="jumbo-component">
            <FontAwesomeIcon
              size="lg"
              icon={['far', 'star']}
              className="light-blue"
            />
            <p>Notes: {this.props.trip ? this.props.trip.dscript : false}</p>
          </div>
          <div className="jumbo-component">
            <FontAwesomeIcon size="lg" icon={['far', 'star']} className="red" />
            <p>Stats component here</p>
          </div>
        </div>
      </div>
    );
  }
}
