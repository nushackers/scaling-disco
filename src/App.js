import React, { Component, Fragment } from 'react';
import { Route, NavLink } from 'react-router-dom';
import firebase from './Firebase';
import Nav from './Nav';
import Home from './Home';
import Signup from './auth/SignupContainer';
import Login from './auth/LoginContainer';
import Admin from './AdminContainer';
import Projects from './projects/ProjectsContainer';
import NewProject from './projects/NewProjectContainer';
import ErrorAlert from './ErrorAlert';
import Group from './groups/Group';
import GroupNewContainer from './groups/GroupNewContainer';
import GroupJoin from './groups/GroupJoin';
import GroupSee from './groups/GroupSee';
import './App.css';

const YEAR = new Date().getFullYear();

class App extends Component {
  state = {
    user: null,
    error: '',
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user, error: '' });
    });
  }

  onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  onDismissAlert = () => this.setState({ error: '' });

  render() {
    const { user } = this.state;
    return (
      <Fragment>
        <Nav>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
                </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/projects">
              Projects
            </NavLink>
          </li>
          {user ? (
            <Fragment>
              <li className="nav-item">Welcome, {user.displayName}</li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/groups">
                  Groups
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/projects/new">
                  Submit Project
                </NavLink>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={this.onSignOut}>
                  Log out
                </button>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Log In
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Sign Up
                </NavLink>
              </li>
            </Fragment>
          )}
        </Nav>
        <main className="container">
          <ErrorAlert error={this.state.error} onDismiss={this.onDismissAlert} />
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/admin" component={Admin} />
          <Route path="/groups" component={Group} exact />
          <Route path="/groups/new" component={GroupNewContainer} />
          <Route path="/groups/join" component={GroupJoin} />
          <Route path="/groups/see" component={GroupSee} />
          <Route path="/projects" component={Projects} exact />
          <Route path="/projects/new" component={NewProject} exact />
        </main>
        <footer>
          <p>
            Hack & Roll {YEAR}
            <span>Built by NUSHackers</span>
          </p>
        </footer>
      </Fragment>
    );
  }
}

export default App;
