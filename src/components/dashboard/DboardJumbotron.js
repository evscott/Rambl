import React, { Component } from 'react';
import CurrentJumbotron from './CurrentJumbotron';
import UpcomingJumbotron from './UpcomingJumbotron';
import NullJumbotron from './NullJumbotron';

export default class DboardJumbotron extends Component {
  constructor(props) {
    super(props);
  }

  /***************************** Core functions *****************************/
  selectJumbotron(){
    let containerView = '';

    if(this.props.isCurrent){
      containerView += <CurrentJumbotron />
    }
    else if(this.props.upcoming.length > 0){
      containerView += <UpcomingJumbotron />
    }
    else{
      containerView += <NullJumbotron />
    }

    return containerView;
  }

  /**************************** Visual component ****************************/

  render() {
    let containerView = this.selectJumbotron();

    return(
      <div className="container">
        {containerView}
      </div>
    );

  };
}
