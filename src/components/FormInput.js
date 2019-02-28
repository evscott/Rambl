import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

/**
 * FormInput is a generic input item for a form element.
 * If an error exists, then it shows that the
 * input is required and it glows red.
 */
export class FormInput extends Component {
  render() {
    // Identify if there is an empty field after submission
    let hasEmpty = this.props.attemptedSubmit && !this.props.value;

    // Identify if a confirmation field matches the original value
    let matches = true;
    if(this.props.compare && this.props.attemptedSubmit){
      matches = this.props.compare === this.props.value;
    }

    // Determine the class for the form group
    let groupClassName = '';
    if(hasEmpty || !matches) groupClassName = 'has-error';

    // Display the error, if necessary
    let errorMsg = hasEmpty ? this.props.displayName + " is required" : "";
    errorMsg += !matches ? "Does not match!" : "";

    // Render the FormInput
    return (
      <Form.Group className={groupClassName}>
        <Form.Label>{this.props.displayName}</Form.Label>
        <Form.Control type={this.props.type}
                      name={this.props.name}
                      onChange={this.props.handleChange}/>
        <Form.Text>{errorMsg}</Form.Text>
      </Form.Group>
    );
  }
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired, // Name of the input element (camelcase)
  displayName: PropTypes.string.isRequired, // Displayed name of input (with spaces)
  type: PropTypes.string.isRequired, // The type of input (i.e. text, password)
  handleChange: PropTypes.func.isRequired, // What to call when the input changes
  value: PropTypes.any.isRequired, // The variable containing the input's value
  compare: PropTypes.any, // Compare this to props.value to confirm props.value
  attemptedSubmit: PropTypes.bool // Whether a submission attempt has been made
};
