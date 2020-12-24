/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
// eslint-disable-next-line react/display-name
export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </BrowserRouter>
);
