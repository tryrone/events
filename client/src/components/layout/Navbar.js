import React, { Component } from "react";
import M from "materialize-css";
import "./Navbar.css";

class Navbar extends Component {
  componentDidMount() {
    //Auto initialize all the things
    M.AutoInit();
  }
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper grey lighten-5">
            <a href="#!" id="country" className="brand-logo ">
              Logo
            </a>
            <a
              href="dffdf"
              data-target="mobile-demo"
              className="sidenav-trigger"
            >
              <i id="country" className="material-icons">
                menu
              </i>
            </a>
            <ul className="right hide-on-med-and-down" id="adjust">
              <li>
                <a href="sass.html" id="country">
                  Events
                </a>
              </li>
              <li>
                <a href="badges.html" id="country">
                  Sign up
                </a>
              </li>
              <li>
                <a href="collapsible.html" id="country">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <a href="sass.html">Sass</a>
          </li>
          <li>
            <a href="badges.html">Components</a>
          </li>
          <li>
            <a href="collapsible.html">Javascript</a>
          </li>
          <li>
            <a href="mobile.html">Mobile</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
