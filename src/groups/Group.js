import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';

/**
 * Groups stuff lol
 */
class Group extends PureComponent {
  render() {
    return (
      <Fragment>
        <div>Hi, your group contains:</div>
        <ul>
          {[2, 3].map((x) => <li>{x}</li>)}
        </ul>
        <ul>
          <li>
            <Link to="/groups/join">Join group</Link>
          </li>
          <li>
            <Link to="/groups/see">See groups</Link>
          </li>
        </ul>
      </Fragment>
    );
  }
}

export default Group;
