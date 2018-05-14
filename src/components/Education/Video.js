import React from "react";
import { connect } from "react-redux";

const Video = ({
    curLecture = {
        id: "zhe zhi ling li de zong se hu li tiao guo yi zhi lan duo de gou",
        lecture: {
            src: "https://www.youtube.com/embed/13z-ddwp6wo",
            title: "No Title Avaliable",
            des: "No Description Avaliable",
            time: "No Time Avaliable",
            uid: "No User"
        }
    }
}) => (
        <div className="video-container">
            <iframe
                className="video"
                src={curLecture.lecture.src}
                allowFullScreen="true"
            />
            <div className="video-first">
                <h2 className="video-title">{curLecture.lecture.title}</h2>
                <h3 className="video-time">Posted {curLecture.lecture.time}</h3>
            </div>
            <h3 className="video-des">{curLecture.lecture.des}</h3>
        </div>
    );

const mapStateToProps = state => ({
    curLecture: state.curLecture
});

export default connect(mapStateToProps)(Video);
