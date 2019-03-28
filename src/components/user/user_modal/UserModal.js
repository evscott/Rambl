import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import UserInfoContainer from '../UserInfoContainer';

export class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header closeButton>
          <Modal.Title>Your info!</Modal.Title>
        </Modal.Header>
        <Modal.Body className={'modal-body'}>
          <UserInfoContainer />
        </Modal.Body>
      </Modal>
    );
  }
}
