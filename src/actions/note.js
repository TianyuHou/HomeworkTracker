import config from "../config.json";
import { getWarn } from "../selectors/utilities";
const f2e = config.f2e;
const firebase = require("../firebase/firebase").firebase;
const database = require("../firebase/firebase").database;

export const getNote = note => ({
  type: "GET_NOTE",
  note
});

export const addNote = note => ({
  type: "ADD_NOTE",
  note
});

export const editNote = (id, note) => ({
  type: "EDIT_NOTE",
  id,
  note
});

export const deleteNote = id => ({
  type: "DELETE_NOTE",
  id
});

const deleteData = (uid, id) => {
  return fetch(`/${uid}/${id}/deleteNote`, {
    method: "DELETE"
  })
    .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
    .catch(() => Promise.reject("create-fail"));
};

export const startDeleteNote = id => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const res = await deleteData(uid, id);
    const warn = getWarn(res);
    if (!warn) {
      dispatch(deleteNote(id));
    }
    return warn;
  };
};

const postData = (uid, note) => {
  return fetch(`/${uid}/addNote`, {
    method: "POST",
    body: JSON.stringify({
      note
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
    .then(data => data)
    .catch(() => Promise.reject("create-fail"));
};

export const startAddNote = note => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const id = await postData(uid, note);
    const warn = getWarn(id);
    if (!warn) {
      dispatch(addNote({ id, note }));
    }
    return warn;
  };
};

const getData = uid => {
  return fetch(`/${uid}/getNote`)
    .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
    .then(data => data)
    .catch(() => Promise.reject("create-fail"));
};

export const startGetNote = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const data = await getData(uid);
    const warn = getWarn(data);
    if (!warn) {
      dispatch(getNote(data));
    }
    return warn;
  };
};

const updateData = (uid, note, id) => {
  return fetch(`/${uid}/${id}/EditNote`, {
    method: "PUT",
    body: JSON.stringify({
      note
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
    .catch(() => Promise.reject("create-fail"));
};

export const startEditNote = (id, note) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const res = await updateData(uid, note, id);
    const warn = getWarn(res);
    if (!warn) {
      dispatch(editNote(id, note));
    }
    return warn;
  };
};
