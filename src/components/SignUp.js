import React, { Component } from "react";
import "./SignUp.css";
import Form from 'react-bootstrap/Form';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default class SignUp extends Component{
  //constructor
  constructor(props) {
    super(props);

    //initial state
    this.state = {
      fName: '',
      lName: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      submitted: false
    };

    //bind
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //save input changes to current state
  //name and value are retrieved in HTML below
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  //when form is submit, check basic requirements and make appropriate
  //call to container if met. TODO: refactor
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { fName, lName, email, confirmEmail, password, confirmPassword } = this.state;
    //all fields must exist.
    if (fName && lName && email && confirmEmail && password && confirmPassword) {
      //confirmations must match.
      if(password.equals(confirmPassword) && email.equals(confirmEmail)){
        this.props.onLogin({fName, lName, email, password});
      }
    }
  }

  //render HTML
  render(){
    const { fName, lName, email, confirmEmail, password, confirmPassword, submitted } = this.state;

    return(

      <div className="container">
        <!-- Sign Up Header. TODO: sticky-->
        <div className="header">
          <faChevronUp />
          <h1>Sign Up</h1>
        </div>

        <!-- Sign Up Form -->
        <Form name="form" onSubmit={this.handleSubmit}>
          <!-- TODO Pull into separate components -->
          <!-- First Name -->
          <Form.Group controlId="formFName"
                      className={(submitted && !fName ? ' has-error' : '')}>
            <Form.Label>First Name</Form.Label>
            <Form.Control placeholder="Enter first name"
                          name="fName"
                          value={fName}
                          onChange={this.handleChange}/>
          </Form.Group>

          <!-- Last Name -->
          <Form.Group controlId="formLName"
                      className={(submitted && !lName ? ' has-error' : '')}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control placeholder="Enter last name"
                          name="lName"
                          value={lName}
                          onChange={this.handleChange}/>
          </Form.Group>

          <!-- Email -->
          <Form.Group controlId="formEmail"
                      className={(submitted && !email ? ' has-error' : '')}>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"
                          name="email"
                          value={email}
                          onChange={this.handleChange}/>
          </Form.Group>

          <!-- Confirm Email -->
          <Form.Group controlId="formConfirmEmail"
                      className={(submitted && !email ||
                        !email.equals(confirmEmail) ? ' has-error' : '')}>
            <Form.Label>Confirm Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"
                          name="confirmEmail"
                          value={confirmEmail}
                          onChange={this.handleChange}/>
          </Form.Group>

          <!-- Password -->
          <Form.Group controlId="formPassword"
                      className={(submitted && !password ? ' has-error' : '')}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password"
                          name="password"
                          value={password}
                          onChange={this.handleChange}/>
          </Form.Group>

          <!-- Confirm Password -->
          <Form.Group controlId="formConfirmPassword"
                      className={(submitted && !password ||
                      !password.equals(confirmPassword) ? ' has-error' : '')}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={this.handleChange}/>
          </Form.Group>

          <!-- Submit Button -->
          <button className="btn btn-primary" type="submit">Sign Up</button>

        </Form>
        <!-- end sign up form -->

      </div>
    );
  }
}
