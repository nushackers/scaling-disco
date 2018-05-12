import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends PureComponent {
  state = {
    isToggleOn: false,
  };

  showDropdown = () =>
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));

  render() {
    const { isToggleOn } = this.state;
    const classDropdownMenu = `navbar-collapse collapse ${this.state.isToggleOn ? 'show' : ''}`;
    return <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <NavLink to="/">Home</NavLink>
        <button className="navbar-toggler" id="navbarDropdown" aria-expanded={isToggleOn} onClick={this.showDropdown}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className={classDropdownMenu}>
          <ul className="nav navbar-nav w-100">{this.props.children}</ul>
        </div>
      </nav>;
  }
}
export default Nav;
