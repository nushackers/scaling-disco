import React, { PureComponent } from 'react';
import Form from 'react-jsonschema-form';

const schema = {
  title: 'Login',
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      title: 'Email',
      default: '',
    },
    password: {
      title: 'Password',
      type: 'string',
      minLength: 8,
      default: '',
    },
  },
};

const uiSchema = {
  email: {
    'ui:widget': 'email',
  },
  password: {
    'ui:widget': 'password',
  },
  'ui:order': ['email', 'password'],
};

/**
 * Auth renders the form for communication with AuthContainer
 */
class Auth extends PureComponent {
  render() {
    return (
      <div className="container">
        {this.props.error && <section>{this.props.error}</section>}
        <Form schema={schema} uiSchema={uiSchema} onSubmit={this.props.onSubmit} />
      </div>
    );
  }
}

export default Auth;
