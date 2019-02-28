import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class Dashboard extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <h1>Hello, {this.props.f_name}</h1>
        <Link to="/" className="btn btn-default" onClick={this.props.onLogout()}>Logout</Link>
      </div>

    );

  }
}
