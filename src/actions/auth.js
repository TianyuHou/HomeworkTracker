import config from "../config.json";
const firebase = require("../firebase/firebase").firebase;
const f2e = config.f2e;

export const login = uid => ({
  type: "LOGIN",
  uid
});

export const startLoginWithPwd = (email, password) => {
  return () => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return errorCode;
      });
  };
};

export const register = (user, info) => {
  return () => {
    return fetch(`/startregister`, {
      method: "POST",
      body: JSON.stringify({
        user,
        info
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
      .catch(() => Promise.reject("create-fail"));
  };
};

export const logout = () => ({
  type: "LOGOUT"
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
