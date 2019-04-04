import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/**
 *  Notes displays an icon and either a trip description, or a
 *  message that there is no trip description
 */

export default class Notes extends Component {
  /**************************** Helper functions ****************************/
  /**
   * Generates the notes information to be displayed
   * @return {*} notes icon followed by either the trip notes or a
   * message indicating there are no trip notes
   */
  getNotesDiv() {
    let par = '';
    if (this.props.dscript) {
      par = <p>Notes: {this.props.dscript}</p>;
    } else {
      par = <p>You do not have any notes</p>;
    }
    return (
      <div>
        <FontAwesomeIcon className="lg-icon dark-blue" icon="pencil-alt" />
        {par}
      </div>
    );
  }
  /**************************** Visual component ****************************/
  render() {
    return <div>{this.getNotesDiv()}</div>;
  }
}

/**
 * List of props to be passed to Notes
 */
Notes.propTypes = {
  dscript: PropTypes.string.isRequired // Trip notes
};
