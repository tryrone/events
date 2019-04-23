import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div id="pic">
      <div className="row s12 m6">
        <div>
          <div class="centered">
            <h1>Welcome to Events</h1>
            <p>We Make Parties better</p>
            <Link class="waves-effect waves-light btn " to="/register">
              Sign Up
            </Link>
            {"        "}
            <Link
              class="waves-effect waves-light btn blue lighten-5"
              id="black"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
