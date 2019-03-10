import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import queryString from 'query-string';
import PropTypes from 'prop-types';

/**
 * This component has all of the options for routing that allow the
 * TripCal to show the right elements.
 * It routes to addresses such as '/trips?id=29&view=month', which
 * means trip id 29, with the month view open.
 */
export class CalViewOptions extends Component {

  constructor(props) {
    super(props);
    this.getPath = this.getPath.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.routeTo = this.routeTo.bind(this);
  }

  getPath() {
    return this.props.history.location.pathname;
  }

  getQuery(view) {
    let location = this.props.history.location;
    let tripId = queryString.parse(location.search).id;
    return '?id=' + tripId + '&view=' + view;
  }

  routeTo(view) {
    let route = {
      pathname: this.getPath(),
      search: this.getQuery(view)
    };
    this.props.history.push(route);
  }

  render() {
    // Get the current calendar view from the URL
    let location = this.props.history.location;
    let currView = queryString.parse(location.search).view;

    return (
      <ButtonGroup>
        <Button
          onClick={() => this.routeTo('month')}
          active={currView === 'month'}
        >
          Month View
        </Button>
        <Button
          onClick={() => this.routeTo('week')}
          active={currView === 'week'}
        >
          Week View
        </Button>
        <Button
          onClick={() => this.routeTo('day')}
          active={currView === 'day'}
        >
          Day View
        </Button>
        <Button
          onClick={() => this.routeTo('agenda')}
          active={currView === 'agenda'}
        >
          Agenda View
        </Button>
      </ButtonGroup>
    );
  }
}

CalViewOptions.propTypes = {
  history: PropTypes.any.isRequired // The router's redirecting history
};
