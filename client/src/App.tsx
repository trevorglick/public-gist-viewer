import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import { Instructions } from "./components/Instructions";

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <Instructions />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
