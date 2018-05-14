import React from "react";
import CommentListItem from "./CommentListItem";
import { connect } from "react-redux";

const CommentList = ({ comments, renderWarn, hideWarn, curLecture }) => (
  <ul>
    {comments.map(comment => (
      <CommentListItem
        url={comment.comment.url}
        authorName={comment.comment.name}
        postDate={comment.comment.time}
        content={comment.comment.content}
        key={comment.id}
        id={comment.id}
        authorId={comment.comment.uid}
        renderWarn={renderWarn}
        hideWarn={hideWarn}
      />
    ))}
  </ul>
);

const mapStateToProps = state => ({
  comments: state.comment,
  curLecture: state.curLecture
});

export default connect(mapStateToProps)(CommentList);
