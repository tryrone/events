import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import Navbar from "../src/components/layout/Navbar";
import Footer from "../src/components/layout/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Footer />
      </div>
    );
  }
}

export default App;
