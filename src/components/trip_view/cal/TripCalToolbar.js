import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * This is a slightly modified version of the default react-big-calendar
 * toolbar, just with the view options removed (those are implemented
 * elsewhere).
 */
export class TripCalToolbar extends Component {
  render() {
    let {
      localizer: { messages },
      label
    } = this.props;

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button
            type="button"
            onClick={this.navigate.bind(null, 'TODAY')}
          >
            {messages.today}
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, 'PREV')}
          >
            {messages.previous}
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, 'NEXT')}
          >
            {messages.next}
          </button>
        </span>

        <span className="rbc-toolbar-label">{label}</span>
      </div>
    );
  }

  navigate = (action) => {
    this.props.onNavigate(action);
  };
}

TripCalToolbar.propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired
};
