import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import queryString from 'query-string';
import PropTypes from 'prop-types';

/**
 * This component has all of the options for routing that allow the
 * TripCal to show the right elements.
 * It routes to addresses such as '/trips?id=29&view=month&filter=accoms+plans',
 * which means trip id 29, the month view open, all events showing.
 */
export class CalViewOptions extends Component {
  constructor(props) {
    super(props);
    this.getPath = this.getPath.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.routeToView = this.routeToView.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  /** Get the path of the current browser's URL */
  getPath() {
    return this.props.history.location.pathname;
  }

  /**
   * Gets the search query from the URL and creates a new one using
   * updated view and filter information. If any argument is null, it
   * uses the previous argument in the URL.
   * @param view the view to direct to
   * @param filter the filter (what to show/hide) to use for the calendar
   * @returns {string} the updated query
   */
  getQuery(view, filter) {
    let location = this.props.history.location;
    let queries = queryString.parse(location.search);

    // If view is null, just use old view
    view = view != null ? view : queries.view;

    // If filter is null, just use old filter
    filter = filter != null ? filter : queries.filter;
    return '?id=' + queries.id + '&view=' + view + '&filter=' + filter;
  }

  /** Routes the window to a different URL */
  routeToView(view) {
    let route = {
      pathname: this.getPath(),
      search: this.getQuery(view, null)
    };
    this.props.history.push(route);
  }

  /**
   * This toggles a filter from the URL query.
   * If all is selected before and a different filter is selected,
   * that filter is removed. In all other cases, it simply toggles.
   * @param filter the filter to toggle
   */
  toggleFilter(filter) {
    let location = this.props.history.location;
    let oldFilter = queryString.parse(location.search).filter;

    // Find all the filters from before
    let newFilterSet;
    if (oldFilter == null) newFilterSet = new Set();
    else newFilterSet = new Set(oldFilter.split(' '));

    // Get the filter we're looking for and toggle it
    if (newFilterSet.has(filter)) newFilterSet.delete(filter);
    else {
      // Should not have 'all' if filtering something specific
      newFilterSet.delete('all');
      newFilterSet.add(filter);
    }

    // Turn this into a string, only add them if 'all' is not selected.
    // If all is selected, all the others are redundant.
    let newFilter = 'all';
    if (!newFilterSet.has('all')) {
      newFilterSet.forEach((filter) => {
        if (newFilter === 'all') newFilter = filter;
        else newFilter += '+' + filter;
      });
    }

    let route = {
      pathname: this.getPath(),
      search: this.getQuery(null, newFilter)
    };
    this.props.history.push(route);
  }

  render() {
    // Get the current calendar view and filters from the URL
    let location = this.props.history.location;
    let queries = queryString.parse(location.search);
    let currView = queries.view;
    let currFilter = new Set(queries.filter.split(' '));

    // These are all the view buttons that are needed.
    // Index 0 is the route, index 1 is the title display.
    let views = [
      ['month', 'Month View'],
      ['week', 'Week View'],
      ['day', 'Day View'],
      ['agenda', 'Agenda View'],
      ['todo', 'To-Do View']
    ];

    // These are all the filters that are needed.
    // Index 0 is the filter, index 1 is the title display.
    let filters = [
      ['all', 'Show all'],
      ['accoms', 'Show accommodations'],
      ['trans', 'Show transportation'],
      ['plans', 'Show plans']
    ];

    return (
      <div>
        <ButtonGroup>
          {views.map((view) => {
            return (
              <Button
                key={view[0]}
                onClick={() => this.routeToView(view[0])}
                active={currView === view[0]}
              >
                {view[1]}
              </Button>
            );
          })}
        </ButtonGroup>
        <ButtonGroup>
          {filters.map((filter) => {
            return (
              <Button
                key={filter[0]}
                onClick={() => this.toggleFilter(filter[0])}
                active={currFilter.has(filter[0])}
              >
                {filter[1]}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
    );
  }
}

CalViewOptions.propTypes = {
  history: PropTypes.any.isRequired // The router's redirecting history
};
