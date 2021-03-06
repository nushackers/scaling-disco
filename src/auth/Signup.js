import React, { PureComponent, Fragment } from 'react';
import Form from 'react-jsonschema-form';

function otherOption(title, options, otherText = 'Other') {
  const titleCapitalized = title.charAt(0).toUpperCase() + title.slice(1);
  const titleOther = `${title}${otherText}`;

  const allOptions = options.slice();
  allOptions.push(otherText);

  const oneOfDictionary = options.map((opt) => {
    return { properties: { [title]: { enum: [opt] } } };
  });
  oneOfDictionary.push({
    properties: {
      [title]: { enum: [otherText] },
      [titleOther]: { title: `${titleCapitalized} (${otherText})`, type: 'string' },
    },
    required: [`${titleOther}`],
  });

  return {
    title: '',
    type: 'object',
    properties: {
      [title]: { title: titleCapitalized, type: 'string', enum: allOptions },
    },
    dependencies: {
      [title]: {
        oneOf: oneOfDictionary,
      },
    },
  };
}

const schema = {
  title: 'Sign Up',
  type: 'object',
  required: ['fullName', 'email', 'password'],
  properties: {
    fullName: { type: 'string', title: 'Full name' },
    email: { type: 'string', format: 'email', title: 'Email' },
    password: {
      type: 'string',
      format: 'password',
      title: 'Password',
      minLength: 6,
    },
    number: { type: 'number', title: 'Contact number' },
    nationality: otherOption('nationality', ['Chinese', 'Indian', 'Malay']),
    education: otherOption('education', [
      'University',
      'Junior College',
      'Polytechnic',
      'Secondary School',
      'Primary School',
    ]),
    dietary: otherOption('dietary', ['Carnivore', 'Vegetarian', 'Vegan']),
    tShirt: { type: 'string', title: 'Preferred T-shirt size', enum: ['XS', 'S', 'M', 'L', 'XL'] },
    emergency: {
      title: 'Emergency Contact',
      type: 'object',
      properties: {
        name: { type: 'string', title: 'Name' },
        number: { type: 'number', title: 'Number' },
        relation: otherOption('relation', ['Father', 'Mother', 'Sibling']),
      },
    },
  },
};

const uiSchema = {
  nationality: {
    nationality: { 'ui:widget': 'radio' },
  },
  dietary: {
    dietary: { 'ui:widget': 'radio' },
  },
  tShirt: { 'ui:widget': 'select' },
  emergency: {
    relation: {
      relation: { 'ui:widget': 'radio' },
    },
  },
  education: {
    education: { 'ui:widget': 'select' },
  },
};

/**
 * Auth renders the form for communication with AuthContainer
 */
class Signup extends PureComponent {
  render() {
    return (
      <Fragment>
        {this.props.error && <section>{this.props.error}</section>}
        <Form schema={schema} uiSchema={uiSchema} onSubmit={this.props.onSubmit} />
      </Fragment>
    );
  }
}

export default Signup;
