import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './Project.css';

/**
 * Project renders a single project
 */
class Project extends PureComponent {
  render() {
    const { title, description } = this.props;
    return (
      <Link className="card card-link col-sm-6" to={`/projects/${1}`}>
        <img className="card-img-top" src="" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </Link>
    );
  }
}

export default Project;
