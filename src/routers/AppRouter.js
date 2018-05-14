import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import Education from "../components/Education/Education";
import Financial from "../components/Financial/Financial";
import Landing from "../components/Landing";
import Home from "../components/Home/Home";
import Notebook from "../components/Notebook/Notebook";
import Profile from "../components/Profile/Profile";
import Register from "../components/Register/Register";
import Lecture from "../components/Lecture/Lecture";
import NotFound from "../components/NotFound";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createHistory();

const AppRouter = () => (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={Landing} exact={true} />
        <PublicRoute path="/home" component={Home} />
        <PublicRoute path="/register" component={Register} />
        <PrivateRoute path="/education" component={Education} />
        <PrivateRoute path="/financial" component={Financial} />
        <PrivateRoute path="/notebook" component={Notebook} />
        <PrivateRoute path="/lecture" component={Lecture} />
        <PrivateRoute path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
