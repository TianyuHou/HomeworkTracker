import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register, startLoginWithPwd } from "../../actions/auth";
import ErrorMessage from "../ErrorMessage";
import ProgressBar from "../ProgressBar";
import { getWarn } from "../../selectors/utilities";
const firebase = require("../../firebase/firebase").firebase;

class Registerform extends Component {
  constructor(props) {
    super(props);
    let warn = "";
    this.state = {
      identity: props.identity,
      email: "",
      pwd: "",
      repwd: "",
      firstName: "",
      lastName: "",
      birth: "",
      gender: "Male",
      phone: "",
      address: "",
      state: "",
      zip: "",
      organization: "",
      img: "/images/profile-default.png",
      progress: 0,
      error: "",
      display: "none"
    };
  }

  checkPwdError = () => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (pattern.exec(this.state.pwd)) return false;
    return true;
  };

  checkImg = () => {
    return this.state.img === "/images/profile-default.png";
  };

  checkRePwd = () => {
    return this.state.pwd === this.state.repwd;
  };

  showWarn = () => {
    this.setState({
      error: this.warn,
      display: "block"
    });
  };

  hideWarn = () => {
    this.warn = "";
    this.setState({
      error: this.warn,
      display: "none"
    });
  };

  checkEmail = () => {
    const pattern = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    if (pattern.exec(this.state.email)) return false;
    return true;
  };

  checkZip = () => {
    const pattern = /^[a-zA-Z0-9 ]{3,12}$/;
    if (pattern.exec(this.state.zip)) return false;
    return true;
  };

  checkEmpty = () => {
    return (
      this.state.email.length === 0 ||
      this.state.pwd.length === 0 ||
      this.state.repwd.length === 0 ||
      this.state.firstName.length === 0 ||
      this.state.lastName.length === 0 ||
      this.state.birth.length === 0 ||
      this.state.gender.length === 0 ||
      this.state.phone.length === 0 ||
      this.state.address.length === 0 ||
      this.state.state.length === 0 ||
      this.state.zip.length === 0 ||
      this.state.organization.length === 0
    );
  };

  checkInput = () => {
    if (this.checkEmpty()) {
      this.warn = "Please Fill All The Input!";
    } else if (this.checkPwdError()) {
      this.warn =
        "Your Password Should at least 8 Characters, At least one uppercase letter, one lowercase letter, and one number";
    } else if (!this.checkRePwd()) {
      this.warn = "Please enter the same password";
    } else if (this.checkEmail()) {
      this.warn = "Please Type a valid Email Address";
    } else if (this.checkZip()) {
      this.warn = "Please Type a valid Zip Code";
    } else if (this.checkImg()) {
      this.warn = "Please upload your profile photo";
    } else {
      this.warn = "";
    }
  };

  onEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  };

  onPwdChange = e => {
    this.setState({
      pwd: e.target.value
    });
  };

  onRepwdChange = e => {
    this.setState({
      repwd: e.target.value
    });
  };

  onReBlur = () => {
    if (this.checkRePwd()) {
      this.warn = "";
      this.hideWarn();
    } else {
      this.warn = "Please enter the same password";
      this.showWarn();
    }
  };

  onFirstNameChange = e => {
    this.setState({
      firstName: e.target.value
    });
  };

  onLastNameChange = e => {
    this.setState({
      lastName: e.target.value
    });
  };

  onBirthChange = e => {
    this.setState({
      birth: e.target.value
    });
  };

  onGenderChange = e => {
    this.setState({
      gender: e.target.value
    });
  };

  onPhoneChange = e => {
    this.setState({
      phone: e.target.value
    });
  };

  onAddressChange = e => {
    this.setState({
      address: e.target.value
    });
  };

  onStateChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  onZipChange = e => {
    this.setState({
      zip: e.target.value
    });
  };

  onOrgChange = e => {
    this.setState({
      organization: e.target.value
    });
  };

  onChange = e => {
    if (e.target.files.length === 0) {
      this.setState({
        img: "/images/profile-default.png"
      });
    } else {
      const imgFile = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(imgFile);

      reader.onload = event => {
        this.setState({
          img: event.target.result,
          imgFile: imgFile
        });
      };
    }
  };

  submit = e => {
    e.preventDefault();
    this.checkInput();
    if (this.warn.length === 0) {
      this.sendInfo();
      // this.hideWarn();
    } else {
      this.showWarn();
      window.scrollTo(0, 0);
    }
  };

  sendInfo = async () => {
    const user = {
      email: this.state.email,
      password: this.state.pwd
    };
    const info = {
      identity: this.state.identity,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      birth: this.state.birth,
      gender: this.state.gender,
      phone: this.state.phone,
      address: this.state.address,
      state: this.state.state,
      zip: this.state.zip,
      organization: this.state.organization,
      imgName: this.state.imgFile.name
    };
    const res = await this.props.register(user, info);
    const warnmsg = getWarn(res);
    if (warnmsg) {
      this.warn = warnmsg;
      this.showWarn();
      window.scrollTo(0, 0);
    } else {
      this.hideWarn();
      this.uploadAvatar(res, user);
      return;
    }
  };

  uploadAvatar = (uid, user) => {
    const that = this;
    const task = firebase
      .storage()
      .ref(`users/${uid}/${this.state.imgFile.name}`)
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
      function error(err) {},
      function complete() {
        that.props.startLoginWithPwd(user.email, user.password);
      }
    );
  };

  reset = () => {
    this.setState({
      identity: this.props.identity,
      email: "",
      pwd: "",
      repwd: "",
      firstName: "",
      lastName: "",
      birth: "",
      gender: "Male",
      phone: "",
      address: "",
      state: "",
      zip: "",
      organization: "",
      img: "/images/profile-default.png",
      error: "",
      display: "none"
    });
    this.warn = "";
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <form className="register-form">
        <ErrorMessage message={this.state.error} display={this.state.display} />
        <div className="register-basic-title">
          <h3>Basic Information</h3>
          <Link to="/home" className="back-btn">
            <i className="fas fa-chevron-circle-left" />
            Back Home
          </Link>
        </div>
        <div className="register-basic">
          <div>
            <label>Identity: </label>
            <input name="identity" value={`${this.state.identity}`} readOnly />
          </div>
          <div>
            <label>Email: </label>
            <input
              name="email"
              placeholder="Email"
              type="email"
              onChange={this.onEmailChange}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              name="password"
              placeholder="Password"
              type="password"
              onChange={this.onPwdChange}
            />
          </div>
          <div>
            <label>Re-enter password: </label>
            <input
              name="repassword"
              type="password"
              placeholder="Renter-Password"
              onChange={this.onRepwdChange}
              onBlur={this.onReBlur}
            />
          </div>
        </div>

        <div className="register-application-title">
          <h3>Application Information</h3>
        </div>

        <div className="register-application">
          <div>
            <label>First Name: </label>
            <input
              name="firstname"
              placeholder="First Name"
              onChange={this.onFirstNameChange}
            />
          </div>
          <div>
            <label>Last Name: </label>
            <input
              name="lastname"
              placeholder="Last Name"
              onChange={this.onLastNameChange}
            />
          </div>
          <div>
            <label>Date of Birth: </label>
            <input
              name="birth"
              placeholder="Date of Birth"
              type="date"
              onChange={this.onBirthChange}
            />
          </div>
          <div>
            <label>Gender: </label>
            <select
              name="gender"
              placeholder="Gender"
              onChange={this.onGenderChange}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label>Phone: </label>
            <input
              name="phone"
              placeholder="Phone"
              type="number"
              onChange={this.onPhoneChange}
            />
          </div>
          <div>
            <label>School/Company: </label>
            <input
              name="org"
              placeholder="School/Company"
              onChange={this.onOrgChange}
            />
          </div>
          <div>
            <label>Address: </label>
            <input
              name="address"
              placeholder="Address"
              onChange={this.onAddressChange}
            />
          </div>
          <div>
            <label>State: </label>
            <input
              name="state"
              placeholder="State"
              onChange={this.onStateChange}
            />
          </div>
          <div>
            <label>Zip Code: </label>
            <input
              name="zip"
              type="number"
              placeholder="Zip Code"
              onChange={this.onZipChange}
            />
          </div>
        </div>

        <div className="register-doc-title">
          <h3>Upload Documents</h3>
        </div>

        <div className="register-doc">
          <div>
            <label>Profile: </label>
            <div className="user-profile">
              <img src={this.state.img} />
            </div>
          </div>
          <div className="upload-profile">
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
          </div>
        </div>

        <div className="register-btn">
          <button type="submit" onClick={this.submit}>
            Submit
          </button>
          <button type="reset" onClick={this.reset}>
            Reset
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  register: (user, info) => dispatch(register(user, info)),
  startLoginWithPwd: (email, password) =>
    dispatch(startLoginWithPwd(email, password))
});

export default connect(null, mapDispatchToProps)(Registerform);
