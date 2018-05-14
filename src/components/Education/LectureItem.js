import React, { Component } from "react";
import { UnmountClosed } from "react-collapse";
import { connect } from "react-redux";
import { startGetMentor } from "../../actions/mentor";
import { startGetCurLecture } from "../../actions/curLecture";
import { startGetComment } from "../../actions/comment";

class LectureItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isopen: false
        };
    }

    click = () => {
        this.setState({
            isopen: !this.state.isopen
        });
    };

    hideIcon = () => {
        this.setState({
            isopen: false
        });
    };

    submit = () => {
        this.props.startGetMentor(this.props.uid);
        this.props.startGetCurLecture(this.props.id);
        this.props.startGetComment(this.props.uid, this.props.id);
        this.hideIcon();
    };

    render() {
        return (
            <div className="table-content">
                <div className="table-small-lecture">
                    <h4 onClick={this.click} className="read-icon">
                        {this.props.title}
                    </h4>

                    <div className="delete-icon">
                        <span onClick={this.submit}>
                            <i className="fas fa-play-circle" /> Watch
            </span>
                    </div>
                </div>
                <UnmountClosed
                    className="collapsible-content"
                    isOpened={this.state.isopen}
                >
                    <h5>{this.props.des}</h5>
                </UnmountClosed>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    startGetMentor: uid => dispatch(startGetMentor(uid)),
    startGetCurLecture: id => dispatch(startGetCurLecture(id)),
    startGetComment: (uid, id) => dispatch(startGetComment(uid, id))
});

export default connect(null, mapDispatchToProps)(LectureItem);
