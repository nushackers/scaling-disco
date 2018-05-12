import React, { PureComponent } from 'react';

/**
 * Project renders a single project
 */
class Project extends PureComponent {
  render() {
    return (
      <article>
        {this.props}
      </article>
    );
  }
}

export default Project;
