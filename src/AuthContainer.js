import React, { PureComponent } from 'react';
import Auth from './Auth';
import firebase from 'firebase/app';

/**
 * AuthContainer is in charge of handling auth logic.
 */
class AuthContainer extends PureComponent {
  state = {
    error: '',
  };

  onSubmit = ({ formData }) => {
    const { email, password } = formData;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        this.setState({
          error: `Error code ${err.code}: ${err.message}`,
        });
      });
  };

  render() {
    return <Auth onSubmit={this.onSubmit} error={this.error} />;
  }
}

export default AuthContainer;
