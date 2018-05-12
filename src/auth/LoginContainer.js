import React, { PureComponent } from 'react';
import Login from './Login';
import firebase from '../Firebase';

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
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        this.setState({
          error: `Error code ${err.code}: ${err.message}`,
        });
      });
  };

  onDismiss = () => this.setState({ error: '' });

  render() {
    return <Login onSubmit={this.onSubmit} onDismiss={this.onDismiss} error={this.state.error} />;
  }
}

export default LoginContainer;
