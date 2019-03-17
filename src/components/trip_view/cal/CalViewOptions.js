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

  /** Get the path of the current browser's URL */
  getPath() {
    return this.props.history.location.pathname;
  }

  /** Get the search query from the URL */
  getQuery(view) {
    let location = this.props.history.location;
    let tripId = queryString.parse(location.search).id;
    return '?id=' + tripId + '&view=' + view;
  }

  /** Routes the window to a different URL */
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

    // These are all the view buttons that are needed.
    // Index 0 is the route, index 1 is the title display.
    let views = [
      ['month', 'Month View'],
      ['week', 'Week View'],
      ['day', 'Day View'],
      ['agenda', 'Agenda View'],
      ['todo', 'To-Do View']
    ];

    return (
      <ButtonGroup>
        {views.map((view) => {
          return (
            <Button key={view[0]}
              onClick={() => this.routeTo(view[0])}
              active={currView === view[0]}
            >
              {view[1]}
            </Button>
          );
        })}
      </ButtonGroup>
    );
  }
}

CalViewOptions.propTypes = {
  history: PropTypes.any.isRequired // The router's redirecting history
};
