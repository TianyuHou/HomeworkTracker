import React, { Component } from "react";
import { connect } from "react-redux";
import { startGetMyLecture } from "../../actions/lecture";
import MyLectureItem from "./MyLectureItem";

const MyLecture = ({ lecture, uid, renderWarn, hideWarn }) => {
  const lectureList = lecture.filter(l => l.lecture.uid === uid);
  const list = lectureList.map(l => {
    return (
      <li key={l.id}>
        <MyLectureItem
          id={l.id}
          title={l.lecture.title}
          des={l.lecture.des}
          time={l.lecture.time}
          src={l.lecture.src}
          renderWarn={renderWarn}
          hideWarn={hideWarn}
        />
      </li>
    );
  });

  return <ul>{list}</ul>;
};

const mapStateToProps = state => ({
  lecture: state.lecture,
  uid: state.auth.uid
});

export default connect(mapStateToProps)(MyLecture);
