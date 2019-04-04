import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
 *  Highlights displays the names of up to three
 *  high priority events for a trip
 */

export default class Highlights extends Component {
  /***************************** Core functions *****************************/
  /**
   * Get name in HTML tags for three high priority events
   * @returns {*} HTML three high priority events
   */
  getSomeHighlights() {
    let highlights = this.props.highPriority.slice(0, 3);
    return highlights.map((event, idx) => (
      <div key={idx}>
        <p>{event.dscript}</p>
      </div>
    ));
  }

  /**************************** Visual component ****************************/
  render() {
    if (this.props.highPriority.length === 0) {
      return (
        <div>
          <div className="icon-padding">
            <FontAwesomeIcon className="med-icon yellow" icon={['far', 'star']} />
          </div>
          <p>You have no high priority events</p>
        </div>
      );
    }
    return (
      <div>
        <div className="icon-padding">
          <FontAwesomeIcon className="med-icon yellow" icon={['far', 'star']} />
        </div>
        <p>Highlights include:</p>
        {this.getSomeHighlights()}
      </div>
    );
  }
}
