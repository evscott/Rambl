import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UpcomingTripsContainer from './UpcomingTripsContainer';
import PreviousTripsContainer from './PreviousTripsContainer';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onLogout();
  }

  render() {
    if (!this.props.isAuthenticated && !this.props.isFetching) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <h1>Hello, {this.props.user.f_name}</h1>

          <UpcomingTripsContainer />
          <PreviousTripsContainer />

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
