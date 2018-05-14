import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import NotebookList from "./NotebookList";
import NoteInput from "./NoteInput";
import ErrorMessage from "../ErrorMessage";

class Notebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "none",
      warn: ""
    };
  }

  renderWarn = msg => {
    this.setState({
      warn: msg,
      display: "block"
    });
    window.scrollTo(0, 0);
  };

  hideWarn = () => {
    this.setState({
      warn: "",
      display: "none"
    });
  };

  render() {
    return (
      <div className="note-container">
        <Header />
        <div className="note">
          <ErrorMessage
            message={this.state.warn}
            display={this.state.display}
          />
          <NoteInput renderWarn={this.renderWarn} hideWarn={this.hideWarn} />
          <div className="table-container">
            <div className="table-title table-title-note">
              <h4>Title</h4>
              <h4>Date</h4>
              <h4>Description</h4>
            </div>
            <ul>
              <NotebookList
                renderWarn={this.renderWarn}
                hideWarn={this.hideWarn}
              />
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Notebook;
