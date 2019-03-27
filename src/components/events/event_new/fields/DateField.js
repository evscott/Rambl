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

  /**
   *
   */
  beginDate() {
    return this.props.begin_time ? this.props.begin_time : new Date();
  }

  /**
   *
   */
  endDate() {
    return this.props.end_time ? this.props.end_time : new Date();
  }

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

  /**
   *
   * @param date
   */
  receiveBeginDate(date) {
    this.props.handleChange('begin_time', date);
  }

  /**
   *
   * @param date
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
