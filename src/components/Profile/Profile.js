import React, { Component } from "react";
import Header from "../Header";
import PersonalInfo from "./PersonalInfo";
import Footer from "../Footer";
import { connect } from "react-redux";
import ProgressBar from "../ProgressBar";
import ErrorMessage from "../ErrorMessage";
const firebase = require("../../firebase/firebase").firebase;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      upload: true,
      progress: 0,
      warn: "",
      display: "none"
    };
  }

  showWarn = msg => {
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

  checkImg = () => {
    return this.state.url === "/images/profile-default.png";
  };

  onClick = () => {
    this.setState({
      upload: false
    });
  };

  onChange = e => {
    if (e.target.files.length === 0) {
      this.setState({
        url: "/images/profile-default.png"
      });
    } else {
      const imgFile = e.target.files[0];
      let reader = new FileReader();

      reader.onload = event => {
        this.setState({
          url: event.target.result,
          imgFile: imgFile
        });
      };

      reader.readAsDataURL(imgFile);
    }
  };

  onCancel = () => {
    this.setState({
      url: this.props.url,
      upload: true
    });
    this.hideWarn();
  };

  onUpdate = () => {
    if (this.checkImg()) {
      this.showWarn("Please Upload Your Profile Picture!");
    } else {
      this.hideWarn();
      const that = this;
      const task = firebase
        .storage()
        .ref(`users/${this.props.uid}/${this.props.imgName}`)
        .put(this.state.imgFile);
      task.on(
        "state_changed",
        function progress(snapshot) {
          const percentage =
            snapshot.bytesTransferred / snapshot.totalBytes * 100;
          that.setState({
            progress: percentage
          });
        },
        function error(err) {
          console.log(err);
        },
        function complete() {
          that.setState({
            url: that.state.url,
            upload: true
          });
        }
      );
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="profile-error">
          <ErrorMessage
            message={this.state.warn}
            display={this.state.display}
          />
        </div>

        <div className="profile">
          <div className="profile-pic">
            <img src={this.state.url} className="profile-image" />
            <div className="edit-icon">
              {this.state.upload ? (
                <a onClick={this.onClick}>
                  <i className="fas fa-edit" />Upload
                </a>
              ) : (
                <div className="upload-profile-icon">
                  <ProgressBar value={this.state.progress} />
                  <input
                    name="avatar"
                    type="file"
                    accept="image/*"
                    capture="camera"
                    id="file-upload"
                    onChange={this.onChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="file-upload" className="upload-files">
                    Select file
                  </label>
                  <div className="profile-check-icon">
                    <span onClick={this.onUpdate}>
                      <i className="far fa-check-circle" />Confirm
                    </span>
                    <span onClick={this.onCancel}>
                      <i className="far fa-times-circle" />Cancel
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="profile-content">
            <PersonalInfo showWarn={this.showWarn} hideWarn={this.hideWarn} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.auth.uid,
  url: state.avatar.url,
  imgName: state.profile.info.imgName
});

export default connect(mapStateToProps)(Profile);
