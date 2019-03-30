import React from 'react';


/**
 * Displays Time untill upcoming trip
 */

export default class CountdownTimer extends React.Component {

    /**************************** Helper functions ****************************/
    getTimeLeft(){
        var start = this.props.currTripInfo.trip_start;
        var curr = new Date();
        var timeDiff = start.getTime() - curr.getTime();
        var daysleft = Math.floor(timeDiff / (1000 * 3600 * 24));
        var hoursleft  = Math.floor(timeDiff - daysleft*(24));
        var minutesleft = Math.floor( timeDiff - daysleft*(24)*(60) - hoursleft*(60));
        var secondsleft = Math.floor(timeDiff - daysleft*(24)*(60)*(60) - hoursleft*(60)*(60) - minutesleft*(60)) ;
        return { days: daysleft , hours: hoursleft, minutes: minutesleft, seconds: secondsleft }
    }

    /**
      * Creates all HTML for countdown timer
      */
    getTimeDiv(){
        var time = this.getTimeLeft()
        return (<div><p>{time.days Days}</p>
                <p>{time.hours Hours}</p>
                <p>{time.minutes} </p>
                <p>{time.seconds} </p></div>)
    }

    /**************************** Visual component ****************************/
    render() {
        return (
            <div> {this.getTimeDiv} </div>
        );
    }
}