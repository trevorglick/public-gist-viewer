import React, { useState, useReducer } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import fetch from "node-fetch";

import { AppEl, Content } from "./App.style";
import { Header } from "./components/Header";
import { Breadcrumb } from "./components/Breadcrumb";
import { Gists } from "./components/Gists";
import { Instructions } from "./components/Instructions";
import { initialState, reducer } from "./reducers/App.reducer";

const App: React.FunctionComponent = () => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userNameSearchValue, setUserNameSearchValue] = useState<string>("");
  // const [gists, setGists] = useState([]);
  // const [error, setError] = useState<boolean>(false);

  const handleSubmit = async () => {
    dispatch({ type: "loading" });
    await fetch(`http://localhost:3001/gist/${userNameSearchValue}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "success", gists: data, userName: userNameSearchValue });
        // setGists(data);
      })
      .catch((error) => {
        dispatch({ type: "error" });
        // setError(true);
      });
    history.push(`/gists/${userNameSearchValue}`);
  };

  console.group("App render");
  console.log("state", state);
  // console.log("error", state.error);
  // console.log("gists", state.gists);
  // console.log("username", state.userName);
  // console.log("loading", state.loading);
  console.groupEnd();

  return (
    <AppEl>
      <Header setUserNameSearchValue={setUserNameSearchValue} onSubmit={handleSubmit} />
      <Breadcrumb />
      <Content>
        <Switch>
          <Route path="/gists/:username">
            <Gists gists={state.gists} error={state.error} loading={state.loading} />
          </Route>
          <Route path="/">
            <Instructions />
          </Route>
        </Switch>
      </Content>
    </AppEl>
  );
};

export default App;
