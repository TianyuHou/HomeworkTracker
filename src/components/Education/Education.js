import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Video from "./Video";
import LectureList from "./LectureList";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import MentorProfile from "./MentorProfile";
import ErrorMessage from "../ErrorMessage";
import { startGetLecture } from "../../actions/lecture";
import { startGetCurLecture, getCurLecture } from "../../actions/curLecture";
import { startGetMentor, getMentor } from "../../actions/mentor";
import { startGetComment } from "../../actions/comment";
import { connect } from "react-redux";

class Education extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warn: "",
            display: "none"
        };
        const defaultLecture = {
            id: "zhe zhi ling li de zong se hu li tiao guo yi zhi lan duo de gou",
            lecture: {
                src: "https://www.youtube.com/embed/13z-ddwp6wo",
                title: "No Title Avaliable",
                des: "No Description Avaliable",
                time: "No Time Avaliable"
            }
        };
        const defaultMentor = {
            info: {
                firstName: "No",
                lastName: " Name Avaliable",
                organization: "No Org Avaliable",
                email: "No Email Avaliable",
                url: "/images/profile-default.png"
            }
        };
        if (this.props.lecture.length === 0) {
            this.props.getMentor(defaultMentor);
            this.props.getCurLecture(defaultLecture);
        } else {
            const id = this.props.lecture[0].id;
            const uid = this.props.lecture[0].lecture.uid;
            this.props.startGetMentor(uid);
            this.props.startGetCurLecture(id);
            this.props.startGetComment(uid, id);
        }
    }

    renderWarn = msg => {
        this.setState({
            warn: msg,
            display: "block"
        });
        window.scrollTo(0, 0);
    };

    hideWarn = () => {
        this.setState({
            warn: "",
            display: "none"
        });
    };

    render() {
        return (
            <div className="education-container">
                <Header />
                <div className="education">
                    <ErrorMessage
                        message={this.state.warn}
                        display={this.state.display}
                    />
                    <div className="education-frame">
                        <div className="education-content">
                            <Video />
                            {this.props.lecture.length === 0 ? (
                                <AddComment
                                    disabled={true}
                                    placeholder="Not Allowed to Add Comment To This Lecture"
                                    renderWarn={this.renderWarn}
                                    hideWarn={this.hideWarn}
                                />
                            ) : (
                                    <AddComment
                                        disabled={false}
                                        placeholder="Add Comment..."
                                        renderWarn={this.renderWarn}
                                        hideWarn={this.hideWarn}
                                    />
                                )}

                            <CommentList
                                renderWarn={this.renderWarn}
                                hideWarn={this.hideWarn}
                            />
                        </div>
                        <div className="education-list">
                            <MentorProfile />
                            <LectureList list={this.props.lecture} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    lecture: state.lecture,
    curLecture: state.curLecture
});

const mapDispatchToProps = dispatch => ({
    startGetLecture: async () => dispatch(startGetLecture()),
    startGetCurLecture: id => dispatch(startGetCurLecture(id)),
    getCurLecture: lecture => dispatch(getCurLecture(lecture)),
    startGetMentor: uid => dispatch(startGetMentor(uid)),
    getMentor: mentor => dispatch(getMentor(mentor)),
    startGetComment: (uid, lectureId) => dispatch(startGetComment(uid, lectureId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Education);
