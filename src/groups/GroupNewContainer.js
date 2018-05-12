import React, { PureComponent } from 'react';
import GroupNew from './GroupNew';
import firebase from 'firebase/app';

/**
 * GroupNewContainer is in charge of handling new groups logic.
 */
class GroupNewContainer extends PureComponent {
  state = {
    error: '',
  };

  onSubmit = ({ formData }) => {
    console.log(formData);
  };

  onDismiss = () => this.setState({ error: '' });

  render() {
    return <GroupNew onSubmit={this.onSubmit} onDismiss={this.onDismiss} error={this.state.error} />;
  }
}

export default GroupNewContainer;
