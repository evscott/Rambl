import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * FormInput is a generic input item for a form element.
 * If the error property is true, then it shows that the
 * input is required and it glows red.
 */
export class FormInput extends Component {
  render() {
    // Identify if there is an error to display
    let hasError = this.props.error && !this.props.value;

    // Determine the class for the div
    let divClassName = 'form-group';
    if (hasError) divClassName += ' has-error';
    // Display the error, if necessary
    let errorDiv = ( hasError ? (
      <div className="help-block">{this.props.displayName} is required</div>
    ) : '');
    // Render the FormInput
    return (
      <div className={divClassName}>
        <label htmlFor={this.props.name}>{this.props.displayName}</label>
        <input
          type={this.props.type}
          className="form-control"
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.handleChange}
        />
        {errorDiv}
      </div>
    );
  }
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired, // Name of the input element (camelcase)
  displayName: PropTypes.string.isRequired, // Displayed name of input (with spaces)
  type: PropTypes.string.isRequired, // The type of input (i.e. text, password)
  handleChange: PropTypes.func.isRequired, // What to call when the input changes
  value: PropTypes.any.isRequired, // The variable containing the input's value
  error: PropTypes.bool // Whether there has been an error or not
};
