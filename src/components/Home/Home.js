import React, { Component } from 'react';
import HomeHeader from './HomeHeader';
import Contact from './Contact';
import Apply from './Apply';
import StudentList from './StudentList';

class Home extends Component {
  constructor(props) {
    super(props);
    const studentContent = `Become an F2E student, you will never have to worry about your tuition fees and living expenses for your education life. With our one-on-one mentors, you will find your dream career guidance!`;
    const mentorContent = `Become an F2E mentor if you want to make a great impact with your talents! Guide ambitious students with their education and career. Make powerful positive effects on students.`;
    const donorContent = `Become an F2E donor if you would like to help outstanding students to finish their education and be a part of their lives. Join us now to protect a dream and make it to be continued!`;

    this.state = {
      studentContent,
      mentorContent,
      donorContent
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="home">
        <div>
          <div className="home-header-container">
            <HomeHeader />
            <div className="home-board">
              <p>
                "The function of education is to teach one to think intensively
                and to think critically. Intelligence plus character - that is
                the goal of true education. "
              </p>
              <div className="home-board-author">
                <hr />
                <p>Martin Luther King, Jr.</p>
              </div>
            </div>
          </div>
          <div className="apply-header">
            <h1>Apply For Our Service</h1>
            <hr />
            <h4>
              "Education is the passport to the future, for tomorrow belongs to
              those who prepare for it today."
            </h4>
          </div>
          <div className="apply-container">
            <Apply identity="student" content={this.state.studentContent} />
            <Apply identity="mentor" content={this.state.mentorContent} />
            <Apply identity="donor" content={this.state.donorContent} />
          </div>
        </div>
        <div className="student-header">
          <h1>Merit Students</h1>
          <hr />
          <h4>
            "Listen to what some of our merit students have to say about F2E
            programs."
          </h4>
        </div>
        <StudentList />
        <Contact />
      </div>
    );
  }
}

export default Home;
