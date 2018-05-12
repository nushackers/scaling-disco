import React, { PureComponent, Fragment } from 'react';
import Form from 'react-jsonschema-form';
import ErrorAlert from './ErrorAlert';

const schema = {
  title: 'New Group',
  type: 'object',
  required: ['email', 'password'],
  properties: {
    groupName: {
      type: 'string',
      title: 'Group name',
    },
  },
};

/**
 * GroupNew renders the form for creating new groups
 */
class GroupNew extends PureComponent {
  render() {
    const { error, onSubmit, onDismiss } = this.props;
    return (
      <Fragment>
        {error && <ErrorAlert error={error} onDismiss={onDismiss} />}
        <Form schema={schema} onSubmit={onSubmit} />
      </Fragment>
    );
  }
}

export default GroupNew;
