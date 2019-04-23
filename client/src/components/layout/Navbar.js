import React, { Component } from "react";
import M from "materialize-css";
import "./Navbar.css";
import { Link } from "react-router-dom";

class Navbar extends Component {
  componentDidMount() {
    //Auto initialize all the things
    M.AutoInit();
  }
  render() {
    return (
      <div>
        <nav className="red accent-3">
          <div className="nav-wrapper indigo darken-1" id="nav">
            <Link
              to="/"
              id="country"
              className="brand-logo "
              style={{ marginLeft: "-91px" }}
            >
              EVENTS
            </Link>
            <a
              href="dffdf"
              data-target="mobile-demo"
              className="sidenav-trigger"
            >
              <i id="country" className="material-icons">
                :
              </i>
            </a>
            <ul className="right hide-on-med-and-down" id="adjust">
              <li>
                <Link to="/events" class="position" id="country">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/register" id="country">
                  Sign up
                </Link>
              </li>
              <li>
                <Link to="/login" id="country">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="badges.html">Components</Link>
          </li>
          <li>
            <Link to="collapsible.html">Javascript</Link>
          </li>
          <li>
            <Link to="mobile.html">Mobile</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
