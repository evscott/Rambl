import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../redux/actions/authActions';

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let email, password, f_name, l_name;
    const { dispatch } = this.props;
    return (
      <form
        onSubmit={e => {
          dispatch(
            signup({
              email: email.value,
              password: password.value,
              f_name: f_name.value,
              l_name: l_name.value
            })
          );
        }}
      >
        Signup:
        <input ref={node => (email = node)} />
        <input ref={node => (password = node)} />
        <input ref={node => (f_name = node)} />
        <input ref={node => (l_name = node)} />
        <button> Submit!</button>
      </form>
    );
  }
}

export default connect()(Signup);
