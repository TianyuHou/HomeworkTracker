import React, { Component } from "react";
import LectureItem from "./LectureItem";

const LectureList = ({ list }) => {
    const lectureList = list.map((l, index) => {
        return (
            <li key={index}>
                <LectureItem
                    id={l.id}
                    uid={l.lecture.uid}
                    title={l.lecture.title}
                    des={l.lecture.des}
                    time={l.lecture.time}
                />
            </li>
        );
    });

    return <ul className="lecture-container">{lectureList}</ul>;
};

export default LectureList;
