import React, { PureComponent, Fragment } from 'react';
import Form from 'react-jsonschema-form';

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
    return (
      <Fragment>
        {this.props.error && <section>{this.props.error}</section>}
        <Form schema={schema} uiSchema={uiSchema} onSubmit={this.props.onSubmit} />
      </Fragment>
    );
  }
}

export default Login;
