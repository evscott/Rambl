import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FormInput } from '../global/FormInput';
import PropTypes from 'prop-types';

export default class TripForm extends Component {
  constructor(props) {
    super(props);

    let name = this.props.trip !== undefined ? this.props.trip.name : '';
    let dscript = this.props.trip !== undefined ? this.props.trip.dscript : '';

    this.state = {
      ...this.props.trip,
      name: name,
      dscript: dscript,
      attemptedSubmit: false
    };

    this.getTripObj = this.getTripObj.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**************************** Helper functions ****************************/
  /**
   * Gets a trip object formatted for MySql.
   * @return {{name: string, dscript: *}}
   */
  getTripObj() {
    if(this.props.trip !== null) {
      return {
        ...this.props.trip,
        name: this.state.name,
        dscript: this.state.dscript
      };
    }
    return {
      name: this.state.name,
      dscript: this.state.dscript
    };
  }

  /**
   * Updates state to the user's input
   * @param e click event
   */
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  /**
   * If name and description exist, add trip and close modal
   * @param e click event
   */
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ attemptedSubmit: true });
    if (this.state.name && this.state.dscript) {
      this.props.addTrip(this.getTripObj());
      this.props.close();
    }
  }
  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        {/* Name */}
        <FormInput
          name="name"
          displayName="Trip Name"
          type="text"
          handleChange={this.handleChange}
          attemptedSubmit={this.state.attemptedSubmit}
          value={this.state.name}
        />

        {/* Description */}
        <FormInput
          name="dscript"
          displayName="Description"
          type="text"
          handleChange={this.handleChange}
          attemptedSubmit={this.state.attemptedSubmit}
          value={this.state.dscript}
        />

        {/* Submit Button */}
        <Form name="logout" onSubmit={this.handleSubmit}>
          <Button variant="primary" size="sm" onClick={this.handleSubmit}>
            <b>Submit</b>
          </Button>
        </Form>
      </div>
    );
  }
}

TripForm.propTypes = {
  trip: PropTypes.any, // a string name for the trip
};
