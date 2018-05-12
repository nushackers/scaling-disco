import React, { PureComponent, Fragment } from 'react';
import { db } from '../Firebase';
import Project from './Project';

/**
 * ProjectsContainer fetches all the projects for the current year
 * and paginates accordingly
 */
class ProjectsContainer extends PureComponent {
  state = {
    projects: [],
  };

  componentDidMount() {
    db
      .collection('projects')
      .orderBy('title')
      .limit(25)
      .startAt(this.props.match.params.page)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
        });
      });
    this.setState({
      projects: [],
    });
  }

  render() {
    console.log(this.props);
    return (
      <Fragment>
        <h2>Projects</h2>
        {this.state.projects.map((project) => <Project {...project} />)}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a className="page-link" href="#">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </Fragment>
    );
  }
}

export default ProjectsContainer;
