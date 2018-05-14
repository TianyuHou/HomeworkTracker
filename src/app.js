import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import configureStore from "./store/configureStore";
import AppRouter, { history } from "./routers/AppRouter";
import { login, logout } from "./actions/auth";
import { startGetProfile } from "./actions/profile";
import { startGetAvatar } from "./actions/avatar";
import { startGetNote } from "./actions/note";
import { startGetLecture } from "./actions/lecture";
import {
  startGetAllTransaction,
  startGetMyTransaction
} from "./actions/transaction";

const firebase = require("./firebase/firebase").firebase;

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("root"));
    hasRendered = true;
  }
};

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    store.dispatch(login(user.uid));
    await store.dispatch(startGetProfile());
    await store.dispatch(startGetAvatar());
    await store.dispatch(startGetNote());
    await store.dispatch(startGetLecture());
    if (store.getState().profile.info.identity.toUpperCase() === "STUDENT") {
      await store.dispatch(startGetMyTransaction());
    } else if (
      store.getState().profile.info.identity.toUpperCase() === "DONOR"
    ) {
      await store.dispatch(startGetAllTransaction());
    }
    renderApp();
    history.push("/profile");
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});
