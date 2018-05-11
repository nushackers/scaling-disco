import React, { PureComponent } from 'react';
import './Auth.css';
import Form from 'react-jsonschema-form';

function otherOption(title, options, otherText = 'Other') {
  const titleCapitalized = title.charAt(0).toUpperCase() + title.slice(1);
  const titleOther = `${title}${otherText}`;

  const allOptions = options.slice();
  allOptions.push(otherText);

  const oneOfDictionary = options.map(opt => { return { properties: { [title]: { enum: [opt] } } } });
  oneOfDictionary.push({
    properties: {
      [title]: { enum: [otherText] },
      [titleOther]: { title: `${titleCapitalized} (${otherText})`, type: 'string' }
    },
    required: [`${titleOther}`]
  });

  return {
    title: '',
    type: 'object',
    properties: {
      [title]: { title: titleCapitalized, type: 'string', enum: allOptions }
    },
    dependencies: {
      [title]: {
        oneOf: oneOfDictionary
      }
    }
  }
}

const schema = {
  title: 'Sign Up',
  type: 'object',
  required: [
    'fullName'
  ],
  properties: {
    fullName: { type: 'string', title: 'Full name' },
    email: { type: 'string', format: 'email', title: 'Email' },
    password: { type: 'string', format: 'password', title: 'Password' },
    number: { type: 'number', title: 'Contact number' },
    nationality: otherOption('nationality', ['Chinese', 'Indian', 'Malay']),
    foodPreference: otherOption('foodPreference', ['Carnivore', 'Vegetarian', 'Vegan']),
    tShirt: { type: 'string', title: 'Preferred T-shirt size', enum: ['XS', 'S', 'M', 'L', 'XL'] },
    emergencyContactName: { type: 'string', title: 'Emergency contact name' },
    emergencyContactNumber: { type: 'number', title: 'Emergency contact number' },
    emergencyContactRelation: otherOption('emergencyContactRelation', ['Father', 'Mother', 'Sibling']),
    status: otherOption('status', ['University', 'Junior College', 'Polytechnic', 'Secondary School', 'Primary School']),
  },
};

const uiSchema = {
  nationality: {
    nationality: { 'ui:widget': 'radio' }
  },
  foodPreference: {
    foodPreference: { 'ui:widget': 'radio' }
  },
  tShirt: { 'ui:widget': 'radio' },
  emergencyContactRelation: {
    emergencyContactRelation: { 'ui:widget': 'radio' }
  },
  status: {
    status: { 'ui:widget': 'radio' }
  }
}

const log = (type) => console.log.bind(console, type);

/**
 * Auth renders the form for communication with AuthContainer
 */
class Signup extends PureComponent {
  render() {
    return (
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onChange={log('changed')}
        onSubmit={log('submitted')}
        onError={log('errors')}
      />
    );
  }
}

export default Signup;
