import React, { Component } from "react";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  move = () => {
    let elem = document.getElementById("progress-bar");
    elem.style.width = this.props.value + "%";
    elem.innerHTML = `Progress ${Math.floor(this.props.value) * 1}%`;
  };

  componentDidMount() {
    this.move();
  }

  componentWillUpdate() {
    this.move();
  }

  render() {
    return (
      <div className="progress">
        <div id="progress-bar" />
      </div>
    );
  }
}

export default ProgressBar;
