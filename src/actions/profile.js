import config from "../config.json";
import { getWarn } from "../selectors/utilities";
const f2e = config.f2e;
const firebase = require("../firebase/firebase").firebase;
const database = require("../firebase/firebase").database;

export const getProfile = info => ({
  type: "GET_PROFILE",
  info
});

export const editProfile = info => ({
  type: "EDIT_PROFILE",
  info
});

const putData = (info, uid) => {
  return fetch(`/${uid}/updateProfile`, {
    method: "PUT",
    body: JSON.stringify({
      info
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
    .catch(() => Promise.reject("create-fail"));
};

export const startEditProfile = (info, uid) => {
  return async dispatch => {
    const res = await putData(info, uid);
    const warn = getWarn(res);
    if (!warn) {
      dispatch(editProfile({ info }));
    }
    return warn;
  };
};

export const getData = uid => {
  return fetch(`/${uid}/getProfile`)
    .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
    .then(data => data)
    .catch(() => Promise.reject("create-fail"));
};

export const startGetProfile = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const data = await getData(uid);
    const warn = getWarn(data);
    if (!warn) {
      dispatch(getProfile(data));
    }
    return warn;
  };
};
