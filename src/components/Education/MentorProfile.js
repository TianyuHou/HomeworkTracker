import React from "react";
import { connect } from "react-redux";

const MentorProfile = ({
    mentor = {
        info: {
            firstName: "No",
            lastName: " Name Avaliable",
            organization: "No Org Avaliable",
            email: "No Email Avaliable",
            url: "/images/profile-default.png"
        }
    }
}) => (
        <div className="mentor-profile">
            <div className="mentor-intro">
                <p>{`${mentor.firstName} ${mentor.lastName}`}</p>
                <p>{mentor.organization}</p>
                <p>{mentor.email}</p>
            </div>
            <img src={mentor.url} />
        </div>
    );

const mapStateToProps = state => ({
    mentor: state.mentor.info
});

export default connect(mapStateToProps)(MentorProfile);
