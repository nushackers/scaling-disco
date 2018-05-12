import React, { Component, Fragment } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/database';
import Home from './Home';
import Signup from './SignupContainer';
import Login from './LoginContainer';
import Admin from './AdminContainer';
import ErrorAlert from './ErrorAlert';
import Group from './Group';
import './App.css';

const YEAR = new Date().getFullYear();

class App extends Component {
  state = {
    isAuthenticated: false,
    error: '',
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      firebase.database().ref(`users/${user.uid}`).once('value').then((snapshot) => {
        const userDetails = snapshot.val();
        this.setState({ isAuthenticated: !!user, user: userDetails });
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
    return (
      <Fragment>
        <nav className="navbar navbar-light bg-light">
          <Link to="/">Home</Link>
          <ul className="nav">
            {this.state.isAuthenticated ? (
              <Fragment>
                <li className="nav-item">
                  Welcome, {this.state.user.fullName}
                </li>
                <NavLink className="nav-link" to="/groups">
                  Groups
                </NavLink>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={this.onSignOut}>Log out</button>
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
          </ul>
        </nav>
        <main className="container">
          <ErrorAlert error={this.state.error} onDismiss={this.onDismissAlert} />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/admin" component={Admin} />
          <Route path="/groups" component={Group} />
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
