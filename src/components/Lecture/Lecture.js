import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header";
import Footer from "../Footer";
import MyLecture from "./MyLecture";
import PostLecture from "./PostLecture";
import ErrorMessage from "../ErrorMessage";

class Lecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warn: "",
      display: "none"
    };
  }

  renderWarn = msg => {
    this.setState({
      warn: msg,
      display: "block"
    });
  };

  hideWarn = () => {
    this.setState({
      warn: "",
      display: "none"
    });
  };

  render() {
    return (
      <div>
        <Header />
        <div>
          <div className="lecture">
            <ErrorMessage
              message={this.state.warn}
              display={this.state.display}
            />
            <PostLecture
              renderWarn={this.renderWarn}
              hideWarn={this.hideWarn}
            />
            <div className="table-container">
              <div className="table-title table-title-lecture">
                <h4>Link</h4>
                <h4>Title</h4>
                <h4>Date</h4>
                <h4>Description</h4>
              </div>
              <ul>
                <MyLecture
                  renderWarn={this.renderWarn}
                  hideWarn={this.hideWarn}
                />
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Lecture;
