import React, { PureComponent } from 'react';
import Signup from './Signup';
import firebase from 'firebase/app';

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
        firebase
          .database()
          .ref(`users/${result.user.uid}`)
          .set(
            {
              fullName: formData.fullName,
              email: formData.email,
            },
            (err) => {
              if (err) {
                this.setState({ error: `Error code ${err.code}: ${err.message}` });
              } else {
                alert('User created');
              }
            },
          );
      })
      .catch((err) => {
        this.setState({ error: `Error code ${err.code}: ${err.message}` });
      });
  };

  render() {
    return <Signup onSubmit={this.onSubmit} error={this.state.error} />;
  }
}

export default SignupContainer;
