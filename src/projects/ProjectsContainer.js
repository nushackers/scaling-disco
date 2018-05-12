import React, { PureComponent, Fragment } from 'react';
import { db } from '../Firebase';
import Project from './Project';

const LIMIT = 25;
const projectsRef = db
  .collection('projects')
  .orderBy('title')
  .limit(LIMIT);

/**
 * ProjectsContainer fetches all the projects for the current year
 * and paginates accordingly
 */
class ProjectsContainer extends PureComponent {
  state = {
    projects: [],
    hasMoreProjects: false,
  };

  componentDidMount() {
    this.fetchProjects(true);
  }

  fetchProjects(init = false) {
    const projects = [...this.state.projects];
    const ref = init ? projectsRef : projectsRef.startAfter(projects[projects.length - 1]);
    ref.get().then((querySnapshot) => {
      // querySnapshot has no map, so we make do...
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        projects.push(doc.data());
      });
      this.setState({ projects, hasMoreProjects: querySnapshot.size === LIMIT });
    });
  }

  render() {
    return (
      <Fragment>
        <h2>Projects</h2>
        <div className="row">
          {this.state.projects.map((proj) => <Project key={proj.title} {...proj} />)}
        </div>
        {this.state.hasMoreProjects && (
          <button className="btn btn-primary" onClick={() => this.fetchProjects()}>
            Load more
          </button>
        )}
      </Fragment>
    );
  }
}

export default ProjectsContainer;
