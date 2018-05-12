import React, { PureComponent } from 'react';
import './Home.css';

/**
 * Home renders the homepage, which resides at root '/'
 */
class Home extends PureComponent {
  render() {
    return (
      <section>
        <img className="img-fluid" src="/logo.png" alt="logo" />
      </section>
    );
  }
}

export default Home;
