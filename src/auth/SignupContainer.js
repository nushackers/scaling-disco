import React, { PureComponent } from 'react';
import Signup from './Signup';
import firebase, { db } from '../Firebase';

/**
 * SignupContainer is in charge of handling auth logic.
 */
class SignupContainer extends PureComponent {
  state = {
    error: '',
  };

  onSubmit = ({ formData }) => {
    const { email, password } = formData;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        db.collection('users')
          .doc(result.user.uid)
          .set({
            fullName: formData.fullName,
            email: formData.email,
          }).then((ref) => {
            alert('User created');
          }).catch((err) => {
            this.setState({ error: `Error code ${err.code}: ${err.message}` });
          });
      }).catch((err) => {
        this.setState({ error: `Error code ${err.code}: ${err.message}` });
      });
  };

  render() {
    return <Signup onSubmit={this.onSubmit} error={this.state.error} />;
  }
}

export default SignupContainer;
