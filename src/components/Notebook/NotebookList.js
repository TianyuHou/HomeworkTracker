import React from "react";
import NotebookItem from "./NotebookItem";
import { connect } from "react-redux";

const NotebookList = ({ note, renderWarn, hideWarn }) => {
  return (
    <ul>
      {note.map(n => {
        return (
          <li key={n.id}>
            <NotebookItem
              id={n.id}
              title={n.note.title}
              des={n.note.des}
              time={n.note.time}
              renderWarn={renderWarn}
              hideWarn={hideWarn}
            />
          </li>
        );
      })}
    </ul>
  );
};

const mapStateToProps = state => ({
  note: state.note
});

export default connect(mapStateToProps)(NotebookList);
