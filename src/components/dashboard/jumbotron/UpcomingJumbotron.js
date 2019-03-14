import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class UpcomingJumbotron extends Component {
  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        <p>countdown component here</p>
        <p>until</p>
        <h2>{this.props.trip.name}</h2>
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
            <p>Notes: {this.props.trip.dscript}</p>
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
