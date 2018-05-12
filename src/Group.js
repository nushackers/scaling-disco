import React, { PureComponent, Fragment } from 'react';

/**
 * Groups stuff lol
 */
class Group extends PureComponent {
  render() {
    return (
      <Fragment>
        <div>Hi, you are not in any group.</div>
        <ul>
          <li><a href='new'>Create new group</a></li>
          <li><a href='join'>Join group</a></li>
          <li><a href='see'>See groups</a></li>
        </ul>
      </Fragment>
    );
  }
}

export default Group;
