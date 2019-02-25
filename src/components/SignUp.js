import React, { Component } from "react";
import "./SignUp.css";
import Form from 'react-bootstrap/Form';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default class SignUp extends Component{
  render(){
    return(
      <div className="container">

        <!-- Sign Up Header. To do: sticky-->
        <div className="header">
          <faChevronUp />
          <h1>Sign Up</h1>
        </div>

        <!-- First Name -->
        <Form.Group controlId="formFName">
          <Form.Label>First Name</Form.Label>
          <Form.Control placeholder="Enter first name" />
        </Form.Group>

        <!-- Last Name -->
        <Form.Group controlId="formLName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control placeholder="Enter last name" />
        </Form.Group>

        <!-- Email -->
        <Form.Group controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <!-- Confirm Email -->
        <Form.Group controlId="formConfirmEmail">
          <Form.Label>Confirm Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <!-- Password -->
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>

        <!-- Confirm Password -->
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>

      </div>
    );
  }
}
