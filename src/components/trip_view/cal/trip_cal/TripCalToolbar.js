import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

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

    console.log(this.props.view);
    let navItems = false;
    if (this.props.view !== 'todo') {
      navItems = (
        <ButtonGroup>
          <Button onClick={this.navigate.bind(null, 'TODAY')}>
            {messages.today}
          </Button>
          <Button onClick={this.navigate.bind(null, 'PREV')}>
            {messages.previous}
          </Button>
          <Button onClick={this.navigate.bind(null, 'NEXT')}>
            {messages.next}
          </Button>
        </ButtonGroup>
      );
    }
    return (
      <div className="rbc-toolbar">
        {navItems}
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
