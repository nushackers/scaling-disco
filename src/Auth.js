import React, { PureComponent } from 'react';
import './Auth.css';
import Form from 'react-jsonschema-form';

const schema = {
  title: 'Formo',
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new task' },
    done: { type: 'boolean', title: 'Done?', default: false },
  },
};

const log = (type) => console.log.bind(console, type);

/**
 * Auth renders the form for communication with AuthContainer
 */
class Auth extends PureComponent {
  render() {
    return (
      <Form
        schema={schema}
        onChange={log('changed')}
        onSubmit={log('submitted')}
        onError={log('errors')}
      />
    );
  }
}

export default Auth;
