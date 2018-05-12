import React, { Component, Fragment } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import Home from './Home';
import SignupContainer from './SignupContainer';
import Auth from './AuthContainer';
import Admin from './AdminContainer';
import './App.css';

const YEAR = new Date().getFullYear();

class App extends Component {
  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-light bg-light">
          <Link to="/">Home</Link>
          <ul className="nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Log In</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
            </li>
          </ul>
        </nav>
        <main className="container-fluid">
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Auth} />
          <Route path="/signup" component={SignupContainer} />
          <Route path="/admin" component={Admin} />
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
