import React, { PureComponent, Fragment } from 'react';
import Form from 'react-jsonschema-form';
import ErrorAlert from './ErrorAlert';

const schema = {
  title: 'Login',
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
      title: 'Email',
    },
    password: {
      title: 'Password',
      type: 'string',
      format: 'password',
      minLength: 6,
    },
  },
};

const uiSchema = {
  'ui:order': ['email', 'password'],
};

/**
 * Login renders the form for communication with LoginContainer
 */
class Login extends PureComponent {
  render() {
    const { error, onSubmit, onDismiss } = this.props;
    return (
      <Fragment>
        {error && <ErrorAlert error={error} onDismiss={onDismiss} />}
        <Form schema={schema} uiSchema={uiSchema} onSubmit={onSubmit} />
      </Fragment>
    );
  }
}

export default Login;
