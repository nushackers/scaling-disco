import React, { Component, Fragment } from 'react';
import { Route, Redirect, NavLink } from 'react-router-dom';
import firebase from './Firebase';
import Home from './Home';
import Signup from './SignupContainer';
import Login from './LoginContainer';
import Admin from './AdminContainer';
import Projects from './projects/ProjectsContainer';
import NewProject from './projects/NewProjectContainer';
import ErrorAlert from './ErrorAlert';
import Group from './Group';
import GroupNewContainer from './GroupNewContainer';
import GroupJoin from './GroupJoin';
import GroupSee from './GroupSee';
import './App.css';

const YEAR = new Date().getFullYear();

class App extends Component {
  state = {
    user: null,
    error: '',
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({ user: null });
        return;
      }
      firebase
        .database()
        .ref(`users/${user.uid}`)
        .once('value')
        .then((snapshot) => {
          const userDetails = snapshot.val();
          this.setState({ user: userDetails });
        });
    });
  }

  onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .catch(function(error) {
        this.setState({ error: error.message });
      });
  };

  onDismissAlert = () => this.setState({ error: '' });

  render() {
    const { user } = this.state;
    return <Fragment>
        <nav className="navbar navbar-light bg-light">
          <NavLink to="/">Home</NavLink>
          <ul className="nav">
            <NavLink className="nav-link" to="/projects">
              Projects
            </NavLink>
            {user ? <Fragment>
                <li className="nav-item">Welcome, {user.fullName}</li>
                <NavLink className="nav-link" to="/groups">
                  Groups
                </NavLink>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/project/new">
                    Submit Project
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={this.onSignOut}>
                    Log out
                  </button>
                </li>
              </Fragment> : <Fragment>
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
              </Fragment>}
          </ul>
        </nav>
        <main className="container">
          <ErrorAlert error={this.state.error} onDismiss={this.onDismissAlert} />
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/admin" component={Admin} />
          <Route exact path="/groups" component={Group} />
          <Route path="/groups/new" component={GroupNewContainer} />
          <Route path="/groups/join" component={GroupJoin} />
          <Route path="/groups/see" component={GroupSee} />
          <Route path="/projects/new" component={NewProject} exact />
          <Redirect from="/projects" to="/projects/1" />
          <Route path="/projects/:page" component={Projects} />
        </main>
        <footer>
          <p>
            Hack & Roll {YEAR}
            <span>Built by NUSHackers</span>
          </p>
        </footer>
      </Fragment>;
  }
}

export default App;
