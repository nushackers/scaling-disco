import React, { PureComponent } from 'react';
import Login from './Login';
import firebase from 'firebase/app';

/**
 * LoginContainer is in charge of handling Login logic.
 */
class LoginContainer extends PureComponent {
  state = {
    error: '',
  };

  onSubmit = ({ formData }) => {
    const { email, password } = formData;
    firebase
      .Login()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        this.setState({
          error: `Error code ${err.code}: ${err.message}`,
        });
      });
  };

  render() {
    return <Login onSubmit={this.onSubmit} error={this.error} />;
  }
}

export default LoginContainer;
