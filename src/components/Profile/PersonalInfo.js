import React, { Component } from "react";
import { connect } from "react-redux";
import { startEditProfile } from "../../actions/profile";

class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.warn = "";
    this.state = {
      disabled: true,
      uid: props.uid,
      identity: props.info.identity,
      email: props.info.email,
      firstName: props.info.firstName,
      lastName: props.info.lastName,
      birth: props.info.birth,
      gender: props.info.gender,
      phone: props.info.phone,
      address: props.info.address,
      zip: props.info.zip,
      state: props.info.state,
      imgName: props.info.imgName,
      organization: props.info.organization
    };
  }

  checkZip = () => {
    const pattern = /^[a-zA-Z0-9 ]{3,12}$/;
    if (pattern.exec(this.state.zip)) return false;
    return true;
  };

  checkEmpty = () => {
    return (
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
    } else if (this.checkZip()) {
      this.warn = "Please Type a valid Zip Code";
    }
  };

  onClick = () => {
    this.setState(
      prevState => {
        return {
          disabled: !prevState.disabled
        };
      },
      () => this.focusInput.focus()
    );
  };

  onUpdate = async () => {
    this.checkInput();
    if (this.warn.length === 0) {
      const info = {
        identity: this.state.identity,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        birth: this.state.birth,
        gender: this.state.gender,
        phone: this.state.phone,
        address: this.state.address,
        zip: this.state.zip,
        state: this.state.state,
        imgName: this.state.imgName,
        organization: this.state.organization
      };

      this.warn = await this.props.startEditProfile(info, this.state.uid);
      if (!this.warn) {
        this.setState({ disabled: true });
        this.props.hideWarn();
      } else {
        this.props.showWarn(this.warn);
      }
    } else {
      this.props.showWarn(this.warn);
    }
  };

  onCancel = () => {
    this.setState({
      disabled: true,
      uid: this.props.uid,
      identity: this.props.info.identity,
      email: this.props.info.email,
      firstName: this.props.info.firstName,
      lastName: this.props.info.lastName,
      birth: this.props.info.birth,
      gender: this.props.info.gender,
      phone: this.props.info.phone,
      address: this.props.info.address,
      zip: this.props.info.zip,
      state: this.props.info.state,
      imgName: this.props.info.imgName,
      organization: this.props.info.organization
    });
    this.props.hideWarn();
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

  render() {
    return (
      <div className="table-container">
        <div className="table-title table-profile-title">
          <h3>Personal Information</h3>

          {this.state.disabled ? (
            <button className="profile-btn" onClick={this.onClick}>
              Edit
            </button>
          ) : (
            <div className="profile-edit-btn">
              <span onClick={this.onUpdate}>
                <i className="far fa-check-circle" />Confirm
              </span>
              <span onClick={this.onCancel}>
                <i className="far fa-times-circle" />Chancel
              </span>
            </div>
          )}
        </div>
        <ul className="table-content table-profile">
          <li>
            <span>Identity</span>
            <input value={this.state.identity} disabled />
          </li>
          <li>
            <span>Email</span>
            <input value={this.state.email} disabled />
          </li>
          <li>
            <span>First Name</span>
            <input
              ref={e => (this.focusInput = e)}
              value={this.state.firstName}
              onChange={this.onFirstNameChange}
              disabled={this.state.disabled}
            />
          </li>
          <li>
            <span>Last Name</span>
            <input
              value={this.state.lastName}
              onChange={this.onLastNameChange}
              disabled={this.state.disabled}
            />
          </li>
          <li>
            <span>Date of Birth</span>
            <input
              value={this.state.birth}
              onChange={this.onBirthChange}
              disabled={this.state.disabled}
              type="date"
            />
          </li>

          <li>
            <span>Phone Number</span>
            <input
              value={this.state.phone}
              onChange={this.onPhoneChange}
              disabled={this.state.disabled}
              type="Number"
            />
          </li>
          <li>
            <span>Address</span>
            <input
              value={this.state.address}
              onChange={this.onAddressChange}
              disabled={this.state.disabled}
            />
          </li>
          <li>
            <span>State</span>
            <input
              value={this.state.state}
              onChange={this.onStateChange}
              disabled={this.state.disabled}
            />
          </li>
          <li>
            <span>Zip</span>
            <input
              value={this.state.zip}
              onChange={this.onZipChange}
              disabled={this.state.disabled}
              type="Number"
            />
          </li>
          <li>
            <span>School</span>{" "}
            <input
              value={this.state.organization}
              onChange={this.onOrgChange}
              disabled={this.state.disabled}
            />
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  info: state.profile.info,
  uid: state.auth.uid
});

const mapDispatchToProps = dispatch => ({
  startEditProfile: (info, uid) => dispatch(startEditProfile(info, uid))
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
