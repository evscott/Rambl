import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';
import '../EventNewForm.css';
import DatePicker from 'react-datepicker/es';
import { formatDateForUser } from '../../../../shared/dateFormatter';

export class DateField extends Component {
  constructor(props) {
    super(props);
    this.receiveBeginDate = this.receiveBeginDate.bind(this);
    this.receiveEndDate = this.receiveEndDate.bind(this);
  }

  /**************************** Helper functions ****************************/

  /**
   * Gets either a specified begin date or today's date.
   */
  beginDate() {
    return this.props.begin_time ? this.props.begin_time : new Date();
  }

  /**
   * Gets either a specified end date or today's date.
   */
  endDate() {
    return this.props.end_time ? this.props.end_time : new Date();
  }

  /**
   * Gets either a specified begin date or a generic begin_date placeholder.
   */
  beginDatePlaceHolder() {
    return this.props.begin_time
      ? formatDateForUser(this.props.begin_time)
      : 'Begins';
  }

  /**
   * Gets either a specified end date or a generic end_date placeholder.
   */
  endDatePlaceHolder() {
    return this.props.end_time
      ? formatDateForUser(this.props.end_time)
      : 'Ends';
  }

  /***************************** Core functions *****************************/

  /**
   * Receives the begin date.
   * @param date of beginning of event.
   */
  receiveBeginDate(date) {
    this.props.handleChange('begin_time', date);
  }

  /**
   * Receives the end date.
   * @param date of end of event.
   */
  receiveEndDate(date) {
    this.props.handleChange('end_time', date);
  }

  /**************************** Visual component ****************************/

  render() {
    if (this.props.useDates)
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
                  selectsStart
                  startDate={this.beginDate()}
                  endDate={this.endDate()}
                  dateFormat={'M/d/yyyy h:mm aa'}
                  onChange={this.receiveBeginDate}
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
                  selectsEnd
                  dateFormat={'M/d/yyyy h:mm aa'}
                  startDate={this.beginDate()}
                  endDate={this.endDate()}
                  onChange={this.receiveEndDate}
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
  useDates: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  begin_time: PropTypes.any,
  end_time: PropTypes.any
};
