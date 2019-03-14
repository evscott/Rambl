import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class NullJumbotron extends Component {
  constructor(props) {
    super(props);
  }

  /***************************** Core functions *****************************/

  /**************************** Visual component ****************************/
  render(){
    return(
      <div>
        <p>You have no upcoming trips :(</p>
        <Link to="#"><p>Create one now!</p></Link>
      </div>
    );
  }
}
