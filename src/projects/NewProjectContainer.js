import React, { PureComponent } from 'react';
import NewProject from './NewProject';
import { db } from '../Firebase';

/**
 * NewProjectContainer is in charge of handling NewProject logic.
 */
class NewProjectContainer extends PureComponent {
  state = {
    error: '',
  };

  onSubmit = ({ formData }) => {
    const { title, description } = formData;
    db
      .collection('projects')
      .doc('d')
      .set({
        title,
        description,
        likes: 0,
      })
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
