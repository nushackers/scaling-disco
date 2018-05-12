import React, { PureComponent } from 'react';

/**
 * Project renders a single project
 */
class Project extends PureComponent {
  render() {
    return (
      <article>
        {JSON.stringify(this.props, null, 2)}
      </article>
    );
  }
}

export default Project;
