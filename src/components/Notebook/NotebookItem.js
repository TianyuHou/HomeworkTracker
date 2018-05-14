import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { connect } from "react-redux";
import { startEditNote, startDeleteNote } from "../../actions/note";
import autosize from "autosize";

class NotebookItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      isopen: false,
      title: props.title,
      des: props.des,
      time: props.time,
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
    return this.state.title.length === 0 || this.state.des.length === 0;
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

  onEdit = () => {
    this.setState({
      isopen: true,
      disabled: false
    });
    this.showEditIcon();
    this.showIcon();
  };

  onUpdate = async () => {
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

      const warnmsg = await this.props.startEditNote(this.state.id, note);
      if (!warnmsg) {
        this.setState({
          isopen: false,
          disabled: true
        });
        this.hideEditIcon();
        this.hideIcon();
        this.props.hideWarn();
      } else {
        this.props.renderWarn(warnmsg);
      }
    }
  };

  onDelete = async () => {
    const warnmsg = await this.props.startDeleteNote(this.state.id);
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
      time: this.props.time
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

  render() {
    return (
      <div className="table-content ">
        <div className="table-title-note">
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
            ref={c => (this.textarea = c)}
            value={this.state.des}
            onChange={this.onDesChange}
            disabled={this.state.disabled}
            className="note-des"
          />
        </Collapse>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startEditNote: (id, note) => dispatch(startEditNote(id, note)),
  startDeleteNote: id => dispatch(startDeleteNote(id))
});

export default connect(null, mapDispatchToProps)(NotebookItem);
