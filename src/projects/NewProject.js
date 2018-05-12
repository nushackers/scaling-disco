import React, { PureComponent, Fragment } from 'react';
import Form from 'react-jsonschema-form';
import ErrorAlert from '../ErrorAlert';

const schema = {
  title: 'Submit Project',
  type: 'object',
  required: ['title', 'description'],
  properties: {
    title: {
      type: 'string',
      title: 'Project title',
    },
    description: {
      type: 'string',
      title: 'What it does',
    },
  },
};

const uiSchema = {
  description: {
    'ui:widget': 'textarea',
    'ui:options': {
      rows: 5,
    },
  },
  'ui:order': ['title', 'description'],
};

/**
 * NewProject renders the form for communication with NewProjectContainer
 */
class NewProject extends PureComponent {
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

export default NewProject;
