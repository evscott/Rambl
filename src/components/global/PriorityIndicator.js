import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';

export class PriorityIndicator extends Component {
  render() {
    switch (this.props.priority) {
      case 1:
        return <Image alt="Low Priority" />;
      case 2:
        return <Image alt="Medium Priority" />;
      case 3:
        return <Image alt="High Priority" />;
      default:
        return <Image alt="No Priority" />;
    }
  }
}

FormInput.propTypes = {
  priority: PropTypes.number.isRequired // The priority of the item to display
};
