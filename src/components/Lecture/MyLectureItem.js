import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { connect } from "react-redux";
import { startEditLecture, startDeleteLecture } from "../../actions/lecture";
import autosize from "autosize";

class MyLectureItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      isopen: false,
      title: props.title,
      des: props.des,
      time: props.time,
      src: props.src,
      id: props.id,
      showIcon: "show-icon",
      hideIcon: "hide-icon",
      showEditIcon: "show-icon",
      hideEditIcon: "hide-icon"
    };
  }

  componentDidMount() {
    autosize(this.textarea);
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

  click = () => {
    this.setState({
      isopen: !this.state.isopen
    });
    this.toggleShowIcon();
  };

  toggleShowIcon = () => {
    this.setState(prevState => {
      return {
        showIcon:
          prevState.showIcon === "show-icon" ? "hide-icon" : "show-icon",
        hideIcon: prevState.hideIcon === "hide-icon" ? "show-icon" : "hide-icon"
      };
    });
  };

  toggleShowEditIcon = () => {
    this.setState(prevState => {
      return {
        showEditIcon:
          prevState.showEditIcon === "show-icon" ? "hide-icon" : "show-icon",
        hideEditIcon:
          prevState.hideEditIcon === "hide-icon" ? "show-icon" : "hide-icon"
      };
    });
  };

  showIcon = () => {
    this.setState({
      showIcon: "hide-icon",
      hideIcon: "show-icon"
    });
  };

  hideIcon = () => {
    this.setState({
      showIcon: "show-icon",
      hideIcon: "hide-icon"
    });
  };

  showEditIcon = () => {
    this.setState({
      showEditIcon: "hide-icon",
      hideEditIcon: "show-icon"
    });
  };

  hideEditIcon = () => {
    this.setState({
      showEditIcon: "show-icon",
      hideEditIcon: "hide-icon"
    });
  };

  onEdit = () => {
    this.setState(
      () => {
        return {
          isopen: true,
          disabled: false
        };
      },
      () => this.focusInput.focus()
    );
    this.showEditIcon();
    this.showIcon();
  };

  onUpdate = async () => {
    if (this.checkInput()) {
      const date = new Date().toString().split(" ");
      date[4] = date[4].substring(0, 5);
      const lecture = {
        title: this.state.title,
        des: this.state.des,
        src: this.state.src.replace("watch?v=", "embed"),
        time: `${date[1]} ${date[2]} ${date[3]} ${date[4]}`
      };
      const warnmsg = await this.props.startEditLecture(this.state.id, lecture);
      if (!warnmsg) {
        this.setState({
          isopen: false,
          disabled: true
        });
        this.hideEditIcon();
        this.hideIcon();
      } else {
        this.props.renderWarn(warnmsg);
      }
    }
  };

  onDelete = async () => {
    const warnmsg = await this.props.startDeleteLecture(this.state.id);
    if (!warnmsg) {
      this.props.hideWarn();
    } else {
      this.props.renderWarn(warnmsg);
    }
  };

  onCancel = () => {
    this.setState({
      isopen: false,
      disabled: true,
      title: this.props.title,
      des: this.props.des,
      time: this.props.time,
      src: this.props.src
    });
    this.hideEditIcon();
    this.hideIcon();
    this.props.hideWarn();
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

  render() {
    return (
      <div className="table-content">
        <div className="table-title-lecture">
          {!this.state.disabled ? (
            <input
              ref={e => (this.focusInput = e)}
              value={this.state.src}
              onChange={this.onSrcChange}
              disabled={this.state.disabled}
            />
          ) : (
            <iframe src={this.state.src} className="lecture-myvideo" />
          )}
          <input
            value={this.state.title}
            onChange={this.onTitleChange}
            disabled={this.state.disabled}
          />
          <h4>{this.state.time}</h4>

          <span
            className={`read-icon ${this.state.hideIcon}`}
            onClick={this.click}
          >
            <i className="fas fa-caret-up" />Collapse
          </span>
          <span
            className={`read-icon ${this.state.showIcon}`}
            onClick={this.click}
          >
            <i className="fas fa-caret-down" />Read More
          </span>

          <div className={`delete-icon ${this.state.showEditIcon}`}>
            <span className="delete-icon" onClick={this.onEdit}>
              <i className="fas fa-pencil-alt" />Edit
            </span>

            <span className="delete-icon" onClick={this.onDelete}>
              <i className="fas fa-trash-alt" />Delete
            </span>
          </div>

          <div className={`delete-icon ${this.state.hideEditIcon}`}>
            <span onClick={this.onUpdate}>
              <i className="far fa-check-circle" />Confirm
            </span>
            <span onClick={this.onCancel}>
              <i className="far fa-times-circle" />Cancel
            </span>
          </div>
        </div>
        <Collapse className="collapsible-content" isOpened={this.state.isopen}>
          <textarea
            value={this.state.des}
            ref={e => (this.textarea = e)}
            onChange={this.onDesChange}
            disabled={this.state.disabled}
            className="lecture-des"
          />
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  curLecture: state.curLecture
});

const mapDispatchToProps = dispatch => ({
  startEditLecture: (id, lecture) => dispatch(startEditLecture(id, lecture)),
  startDeleteLecture: id => dispatch(startDeleteLecture(id))
});

export default connect(null, mapDispatchToProps)(MyLectureItem);
