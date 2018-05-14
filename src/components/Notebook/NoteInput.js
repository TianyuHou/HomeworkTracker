import React, { Component } from "react";
import { connect } from "react-redux";
import { startAddNote } from "../../actions/note";

class NoteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      des: ""
    };
  }

  checkEmpty = () => {
    return this.state.title.length === 0 || this.state.des.length === 0;
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

  onSubmit = async () => {
    if (this.checkEmpty()) {
      this.props.renderWarn("Please Fill All the Input!");
    } else {
      const date = new Date().toString().split(" ");
      date[4] = date[4].substring(0, 5);
      const note = {
        title: this.state.title,
        des: this.state.des,
        time: `${date[1]} ${date[2]} ${date[3]} ${date[4]}`
      };
      const warnmsg = await this.props.startAddNote(note);
      if (!warnmsg) {
        this.reset();
        this.props.hideWarn();
      } else {
        this.props.renderWarn(warnmsg);
      }
    }
  };

  reset = () => {
    this.setState({
      title: "",
      des: ""
    });
  };

  render() {
    return (
      <div className="note-input">
        <div className="note-input-first">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.onTitleChange}
          />
          <button onClick={this.onSubmit} className="note-btn search-btn">
            Publish
          </button>
        </div>
        <textarea
          name="description"
          value={this.state.des}
          onChange={this.onDesChange}
          placeholder="Description"
          className="note-input-des"
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddNote: note => dispatch(startAddNote(note))
});

export default connect(null, mapDispatchToProps)(NoteInput);
