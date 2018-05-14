import React, { Component } from "react";
import { connect } from "react-redux";
import { startDeleteComment } from "../../actions/comment";
import autosize from "autosize";

class CommentListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isopen: false
    };
  }

  componentDidMount() {
    autosize(this.textarea);
  }

  click = () => {
    this.setState({
      isopen: !this.state.isopen
    });
  };

  onDelete = async () => {
    const warnmsg = await this.props.startDeleteComment(
      this.props.curLecture.lecture.uid,
      this.props.curLecture.id,
      this.props.id
    );
    if (!warnmsg) {
      this.props.hideWarn();
    } else {
      this.props.renderWarn(warnmsg);
    }
  };

  render() {
    return (
      <li className="table-content table-comment">
        <div className="comment-item">
          <div className="comment-header">
            <div className="comment-header-pic">
              <img src={this.props.url} />
              <h5>{this.props.authorName}</h5>
            </div>
            <h5>{this.props.postDate}</h5>
          </div>
          <div className="comment-content">
            <textarea
              value={this.props.content}
              ref={c => (this.textarea = c)}
              disabled
            />
            {this.props.uid === this.props.authorId ? (
              <div className="delete-icon">
                <span onClick={this.onDelete}>
                  <i className="fas fa-trash-alt" />Delete
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.auth.uid,
  curLecture: state.curLecture
});

const mapDispatchToProps = dispatch => ({
  startDeleteComment: (uid, lectureId, id) =>
    dispatch(startDeleteComment(uid, lectureId, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentListItem);
