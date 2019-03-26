import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 *  DashboardNav displays the navigation required on the dashboard,
 *  along with appropriate redirections
 */

export default class DashboardNav extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /***************************** Core functions *****************************/
  handleSubmit(e) {
    e.preventDefault();
    this.props.onLogout();
  }

  /**************************** Visual component ****************************/
  render() {
    if (!this.props.isAuthenticated && !this.props.isFetching) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <div className="title">
            <h3>
              <span className="red">R</span>
              <span className="yellow">a</span>
              <span className="dark-blue">m</span>
              <span className="red">b</span>
              <span className="dark-blue">l</span>
            </h3>
          </div>
          <a href="#section-upcoming">
            <Button className="btn btn-light">Upcoming Trips</Button>
          </a>
          <br />
          <a href="#section-previous">
            <Button className="btn btn-light">Previous Trips</Button>
          </a>

          {/* Logout button */}
          <Form name="logout" onSubmit={this.handleSubmit}>
            <Button className="btn btn-default" type="submit">
              Logout
            </Button>
          </Form>
        </div>
      );
    }
  }
}
