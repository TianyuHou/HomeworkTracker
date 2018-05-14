import config from "../config.json";
const f2e = config.f2e;
const firebase = require("../firebase/firebase").firebase;
const database = require("../firebase/firebase").database;

export const getAvatar = url => ({
  type: "GET_AVATAR",
  url
});

export const editAvatar = url => ({
  type: "EDIT_AVATAR",
  url
});

export const startGetAvatar = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    const imgName = getState().profile.info.imgName;
    const url = await getImg(uid, imgName);
    dispatch(getAvatar({ url }));
  };
};

export const getImg = async (uid, imgName) => {
  let url;
  await firebase
    .storage()
    .ref(`users/${uid}/${imgName}`)
    .getDownloadURL()
    .then(data => {
      url = data;
    })
    .catch(e => {
      console.log(e);
    });
  return url;
};
