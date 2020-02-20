import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Home, GetMeanMode } from './Containers/index';

const RouterComponent = () => {
  return (
    <Router history={Router.history}>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/statistics">
            <GetMeanMode />
          </Route>
      </Switch>
    </Router>
  )
}

export default RouterComponent;
