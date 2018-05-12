import React, { PureComponent, Fragment } from 'react';
import Form from 'react-jsonschema-form';

const schema = {
  title: 'Join Group',
  type: 'object',
  required: ['email'],
  properties: {
    email: { type: 'string', title: "Enter one of your friend's email..." }
  }
}

/**
 * Join groups
 */
class GroupJoin extends PureComponent {
  render() {
    return (
      <Fragment>
        <div>Join Group</div>
        <Form schema={schema} onSubmit={this.props.onSubmit} />
      </Fragment>
    );
  }
}

export default GroupJoin;
