import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import Signup from './Signup';
import firebase, { db } from '../Firebase';

/**
 * SignupContainer is in charge of handling auth logic.
 */
class SignupContainer extends PureComponent {
  state = {
    isAuthenticated: false,
    error: '',
  };

  onSubmit = ({ formData }) => {
    const { email, password, ...otherData } = formData;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const { user } = result;
        const profileUpdate = user.updateProfile({ displayName: otherData.fullName });
        const dbUpdate = db
          .collection('users')
          .doc(user.uid)
          .set(otherData);
        return Promise.all([profileUpdate, dbUpdate]);
      })
      .then(() => {
        this.setState({ isAuthenticated: true });
      })
      .catch((err) => {
        this.setState({ error: `Error code ${err.code}: ${err.message}` });
      });
  };

  render() {
    if (this.state.isAuthenticated) return <Redirect to="/" />;
    return <Signup onSubmit={this.onSubmit} error={this.state.error} />;
  }
}

export default SignupContainer;
