import React, { Component } from 'react';
import { Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './UserEdit.css';
import { SubmitButton } from '../../global/SubmitButton';
import { ReturnButton } from '../../global/ReturnButton';

/**
 * This component simply displays a users information.
 */
export class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      f_name: this.props.f_name,
      l_name: this.props.l_name
    };
    this.handleChange = this.handleChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onUpdate() {
    this.props.updateUser(this.state);
    this.props.onReturn();
  }

  /**************************** Visual component ****************************/
  render() {
    return (
      <div>
        <Form>
          <Form.Row>
            <Col>
              <Form.Label>Your first name</Form.Label>
              <Form.Control
                placeholder={this.props.f_name}
                name={'f_name'}
                onChange={this.handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Your last name</Form.Label>
              <Form.Control
                placeholder={this.props.l_name}
                name={'l_name'}
                onChange={this.handleChange}
              />
            </Col>
          </Form.Row>
        </Form>
        <div className={'buttons'}>
          <div className={'submit-button'}>
            <SubmitButton handleChange={this.onUpdate} />
          </div>
          <div className={'return-button'}>
            <ReturnButton handleChange={this.props.onReturn} />
          </div>
        </div>
      </div>
    );
  }
}

UserEdit.propTypes = {
  onReturn: PropTypes.func.isRequired
};
