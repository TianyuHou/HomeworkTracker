import React, { Component } from "react";
import { connect } from "react-redux";
import { startAddLecture } from "../../actions/lecture";

class PostLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      des: "",
      src: ""
    };
  }

  checkEmpty = () => {
    return (
      this.state.title.length === 0 ||
      this.state.des.length === 0 ||
      this.state.src.length === 0
    );
  };

  checkYoutube = () => {
    return this.state.src.indexOf("https://www.youtube.com/") === -1;
  };

  checkInput = () => {
    if (this.checkEmpty()) {
      this.props.renderWarn("Please Enter All The Input!");
      return false;
    } else if (this.checkYoutube()) {
      this.props.renderWarn("Please Enter A Valid Youtube Link!");
      return false;
    } else {
      this.props.hideWarn();
      return true;
    }
  };

  onTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  onDesChange = e => {
    this.setState({
      des: e.target.value
    });
  };

  onSrcChange = e => {
    this.setState({
      src: e.target.value
    });
  };

  onSubmit = async () => {
    if (this.checkInput()) {
      const date = new Date().toString().split(" ");
      date[4] = date[4].substring(0, 5);
      const lecture = {
        uid: this.props.uid,
        title: this.state.title,
        des: this.state.des,
        src: this.state.src.replace("watch?v=", "embed/"),
        time: `${date[1]} ${date[2]} ${date[3]} ${date[4]}`
      };
      const warnmsg = await this.props.startAddLecture(lecture);
      if (!warnmsg) {
        this.reset();
      } else {
        this.props.renderWarn(warnmsg);
      }
    }
  };

  reset = () => {
    this.setState({
      title: "",
      des: "",
      src: ""
    });
  };

  render() {
    return (
      <div className="lecture-input">
        <div className="lecture-input-first">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.onTitleChange}
            />
            <input
              type="text"
              name="src"
              placeholder="Youtube Link://"
              value={this.state.src}
              onChange={this.onSrcChange}
            />
          </div>
          <button className="lecture-btn search-btn" onClick={this.onSubmit}>
            Publish
          </button>
        </div>

        <textarea
          name="description"
          placeholder="description"
          value={this.state.des}
          onChange={this.onDesChange}
          className="lecture-input-des"
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddLecture: lecture => dispatch(startAddLecture(lecture))
});

const mapStateToProps = state => ({
  uid: state.auth.uid
});

export default connect(mapStateToProps, mapDispatchToProps)(PostLecture);
