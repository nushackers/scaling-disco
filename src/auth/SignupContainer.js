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

        otherData.group = user.uid;

        const userUpdate = db
          .collection('users')
          .doc(user.uid)
          .set({ email: email, group: user.uid });
        //.set(otherData);

        const groupUpdate = db
          .collection('groups')
          .doc(user.uid)
          .set({ members: [user.uid] });

        return Promise.all([profileUpdate, userUpdate, groupUpdate]);
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
