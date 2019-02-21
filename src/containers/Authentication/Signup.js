import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../../redux/actions/authActions';

const Signup = ({ dispatch }) => {
  let email, password, f_name, l_name;
  return (
    <div>
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
        <input ref={node => (email = node)} />
        <input ref={node => (password = node)} />
        <input ref={node => (f_name = node)} />
        <input ref={node => (l_name = node)} />
        <button> Submit!</button>
      </form>
    </div>
  );
};

export default connect()(Signup);
