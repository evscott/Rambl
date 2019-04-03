import React, { Component } from 'react';
import './countdown.css';

/**
 * Displays Time untill upcoming trip
 */

export default class CountdownTimer extends Component {
  /**************************** Helper functions ****************************/
  getTimeLeft(start) {
    let curr = new Date();
    let timeDiff = start.getTime() - curr.getTime();
    let daysleft = Math.floor(timeDiff / (1000 * 3600 * 24));
    let hoursleft = Math.floor(timeDiff / (1000 * 3600) - daysleft * 24);
    let minutesleft = Math.floor(
      timeDiff / (1000 * 60) - daysleft * 24 * 60 - hoursleft * 60
    );
    let secondsleft = Math.floor(
      timeDiff / 1000 -
        daysleft * 24 * 60 * 60 -
        hoursleft * 60 * 60 -
        minutesleft * 60
    );
    return {
      days: daysleft,
      hours: hoursleft,
      minutes: minutesleft,
      seconds: secondsleft
    };
  }

  /**
   * Creates all HTML for countdown timer
   */
  getTimeDiv() {
    let currTrip = this.props.currTripInfo.trip;
    if (currTrip === null) {
      return;
    }
    let start = this.props.currTripInfo.trip.trip_start;
    if (start === undefined) {
      return;
    }

    let time = this.getTimeLeft(start);
    return (
      <div className="flex-wrap-center">
        <div className="countdown-elem">
          <p>{time.days} Days</p>
        </div>
        <div className="countdown-elem">
          <p>{time.hours} Hours</p>
        </div>
        <div className="countdown-elem">
          <p>{time.minutes} Minutes</p>
        </div>
        <div className="countdown-elem">
          <p>{time.days} Seconds</p>
        </div>
      </div>
    );
  }

  /**************************** Visual component ****************************/
  render() {
    return <div>{this.getTimeDiv()}</div>;
  }
}
