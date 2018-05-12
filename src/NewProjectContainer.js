import React, { PureComponent } from 'react';
import NewProject from './NewProject';
import firebase from 'firebase/app';

/**
 * NewProjectContainer is in charge of handling NewProject logic.
 */
class NewProjectContainer extends PureComponent {
  state = {
    error: '',
  };

  onSubmit = ({ formData }) => {
    const { title, description } = formData;
    firebase
      .firestore()
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
    return (
      <NewProject onSubmit={this.onSubmit} onDismiss={this.onDismiss} error={this.state.error} />
    );
  }
}

export default NewProjectContainer;
