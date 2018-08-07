import React, { Component } from "react";

import "./App.css";

import Spreadsheet from "./sheet.jsx";
import Header from "./Header.jsx";
import Modal from "./Modal.jsx";
import Paper from "./Paper.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    return (
      <div>
        <Header />
        <Paper>
          <Spreadsheet controller={this.props.controller} />
        </Paper>
        <Modal
          children={
            <h3>
              I added a modal to show I can, but I don't want to pull people out
              of the spreadsheet context
            </h3>
          }
        />
      </div>
    );
  }
}

export default App;
