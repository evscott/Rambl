import React, { Component }  from 'react';
import "./countdown.css"

/**
 * Displays Time untill upcoming trip
 */

export default class CountdownTimer extends Component {

    /**************************** Helper functions ****************************/
    getTimeLeft() {

        var start = this.props.currTripInfo.trip.trip_start;
        var curr = new Date();
        var timeDiff = start.getTime() - curr.getTime();
        var daysleft = Math.floor(timeDiff / (1000 * 3600 * 24));
        var hoursleft  = Math.floor(timeDiff/ (1000* 3600) - daysleft*(24));
        var minutesleft = Math.floor( timeDiff/ (1000* 60) - daysleft*(24)*(60) - hoursleft*(60));
        var secondsleft = Math.floor(timeDiff/ (1000) - daysleft*(24)*(60)*(60) - hoursleft*(60)*(60) - minutesleft*(60));
        return { days: daysleft, hours: hoursleft, minutes: minutesleft, seconds: secondsleft };
    }

    /**
      * Creates all HTML for countdown timer
      */
    getTimeDiv() {
        var time = this.getTimeLeft();
        return (<div className= "flex-wrap-center">
                    <div className= "countdown-elem">
                        <p>{time.days } Days</p>
                    </div>
                    <div className= "countdown-elem">
                        <p>{time.hours } Hours</p>
                    </div>
                    <div  className= "countdown-elem">
                        <p>{time.minutes } Minutes</p>
                    </div>
                    <div  className= "countdown-elem">
                        <p>{time.days } Seconds</p>
                    </div>
                </div>);
    }
    /**************************** Visual component ****************************/
    render() {
        return (
            <div>{this.getTimeDiv()}</div>
        );
    }
}