import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import authReducer from "../reducers/auth";
import profileReducer from "../reducers/profile";
import avatarReducer from "../reducers/avatar";
import noteReducer from "../reducers/note";
import lectureReducer from "../reducers/lecture";
import mentorReducer from "../reducers/mentor";
import curLectureReducer from "../reducers/curLecture";
import commentReducer from "../reducers/comment";
import transactionReducer from "../reducers/transaction";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      profile: profileReducer,
      avatar: avatarReducer,
      note: noteReducer,
      lecture: lectureReducer,
      mentor: mentorReducer,
      curLecture: curLectureReducer,
      comment: commentReducer,
      transaction: transactionReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
