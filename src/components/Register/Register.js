import React, { Component } from 'react';
import Registerform from './Registerform';
import Footer from '../Footer';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: props.location.state.identity
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Registerform identity={this.state.identity} />
        <Footer />
      </div>
    );
  }
}

export default Register;
