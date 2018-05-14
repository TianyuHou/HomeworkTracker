import React, { Component } from "react";
import { connect } from "react-redux";
import { startAddComment } from "../../actions/comment";

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  change = e => {
    this.setState({
      content: e.target.value
    });
  };

  submit = async () => {
    const date = new Date().toString().split(" ");
    date[4] = date[4].substring(0, 5);
    const uid = this.props.lecture.lecture.uid;
    const id = this.props.lecture.id;
    const comment = {
      content: this.state.content,
      name: this.props.name,
      uid: this.props.uid,
      url: this.props.url,
      time: `${date[1]} ${date[2]} ${date[3]} ${date[4]}`
    };
    const warnmsg = await this.props.startAddComment(uid, id, comment);
    if (!warnmsg) {
      this.props.hideWarn();
      this.reset();
    } else {
      this.props.renderWarn(warnmsg);
    }
  };

  reset = () => {
    this.setState({
      content: ""
    });
  };

  render() {
    return (
      <div className="addcomment">
        <textarea
          className="reply"
          onChange={this.change}
          type="text"
          value={this.state.content}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          wrap="hard"
          cols="70"
        />
        <div className="addcomment-profile">
          <button
            className="add-comment-btn"
            onClick={this.submit}
            disabled={this.props.disabled}
          >
            Send
          </button>
          <button
            type="reset"
            onClick={this.reset}
            className="add-comment-btn"
            disabled={this.props.disabled}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lecture: state.curLecture,
  uid: state.auth.uid,
  name: `${state.profile.info.firstName} ${state.profile.info.lastName}`,
  url: state.avatar.url
});

const mapDispatchToProps = dispatch => ({
  startAddComment: (uid, lectureId, comment) =>
    dispatch(startAddComment(uid, lectureId, comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
