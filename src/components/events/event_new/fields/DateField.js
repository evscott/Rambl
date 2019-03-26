import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';
import '../EventNewForm.css';
import DatePicker from 'react-datepicker/es';
import { formatDateForUser } from '../../../../shared/dateFormatter';

export class DateField extends Component {
  /**
   *
   */
  beginDatePlaceHolder() {
    return this.props.begin_time
      ? formatDateForUser(this.props.begin_time)
      : 'Begins';
  }

  /**
   *
   */
  endDatePlaceHolder() {
    return this.props.end_time
      ? formatDateForUser(this.props.end_time)
      : 'Ends';
  }

  /**************************** Visual component ****************************/

  render() {
    if (this.props.displayDates)
      // display dates
      return (
        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label>Begins</Form.Label>
              <div>
                <DatePicker
                  className={'form-control date-width'}
                  placeholderText={this.beginDatePlaceHolder()}
                  showTimeInput
                  dateFormat={'M/d/yyyy h:mm aa'}
                  fixedHeight
                  onChange={this.props.handleChange}
                />
              </div>
            </Col>
            <Col>
              <Form.Label>Ends</Form.Label>
              <div>
                <DatePicker
                  className={'form-control date-width'}
                  placeholderText={this.endDatePlaceHolder()}
                  showTimeInput
                  dateFormat={'M/d/yyyy h:mm aa'}
                  fixedHeight
                  onChange={this.props.handleChange}
                />
              </div>
            </Col>
          </Form.Row>
        </Form.Group>
      );
    else return null;
  }
}

DateField.propTypes = {
  displayDates: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  begin_time: PropTypes.any,
  end_time: PropTypes.any
};
