import config from "../config.json";
import { getWarn } from "../selectors/utilities";
const f2e = config.f2e;
const firebase = require("../firebase/firebase").firebase;
const database = require("../firebase/firebase").database;

export const getLecture = lecture => ({
  type: "GET_LECTURE",
  lecture
});

export const addLecture = lecture => ({
  type: "ADD_LECTURE",
  lecture
});

export const editLecture = (id, lecture) => ({
  type: "EDIT_LECTURE",
  id,
  lecture
});

export const deleteLecture = id => ({
  type: "DELETE_LECTURE",
  id
});

const deleteData = (uid, id) => {
  return fetch(`/${uid}/${id}/deleteLecture`, {
    method: "DELETE"
  })
    .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
    .catch(() => Promise.reject("create-fail"));
};

export const startDeleteLecture = id => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const res = await deleteData(uid, id);
    const warn = getWarn(res);
    if (!warn) {
      dispatch(deleteLecture(id));
    }
    return warn;
  };
};

const postData = (uid, lecture) => {
  return fetch(`/${uid}/addLecture`, {
    method: "POST",
    body: JSON.stringify({
      lecture
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
    .then(data => data)
    .catch(() => Promise.reject("create-fail"));
};

export const startAddLecture = lecture => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const id = await postData(uid, lecture);
    const warn = getWarn(id);
    if (!warn) {
      dispatch(addLecture({ id, lecture }));
    }
    return warn;
  };
};

const getMyData = uid => {
  return fetch(`/${uid}/getMyLecture`)
    .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
    .then(data => data)
    .catch(() => Promise.reject("create-fail"));
};

const getData = () => {
  return fetch(`/getAllLecture`)
    .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
    .then(data => data)
    .catch(() => Promise.reject("create-fail"));
};

export const startGetLecture = () => {
  return async (dispatch, getState) => {
    const data = await getData();
    const warn = getWarn(data);
    if (!warn) {
      dispatch(getLecture(data));
    }
    return warn;
  };
};

const updateData = (uid, lecture, id) => {
  return fetch(`/${uid}/${id}/EditLecture`, {
    method: "PUT",
    body: JSON.stringify({
      lecture
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
    .catch(() => Promise.reject("create-fail"));
};

export const startEditLecture = (id, lecture) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const res = await updateData(uid, lecture, id);
    const warn = getWarn(res);
    if (!warn) {
      dispatch(editLecture(id, lecture));
    }
    return warn;
  };
};
