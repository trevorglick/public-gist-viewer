import React, { useState, useReducer } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import fetch from "node-fetch";
import { useQuery } from "@apollo/client";

import { AppEl, Content } from "./App.style";
import { Header } from "./components/Header";
import { Favorites } from "./components/Favorites";
import { Detail } from "./components/Gists/Detail";
import { Gists } from "./components/Gists";
import { Instructions } from "./components/Instructions";
import { initialState, reducer } from "./reducers/App.reducer";
import { GET_FAVORITES } from "./graphql/queries";
import { TFavorite } from "./components/Favorites/types";

const App: React.FunctionComponent = () => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userNameSearchValue, setUserNameSearchValue] = useState<string>("");
  const { data: favData, loading: favLoading, refetch: refetchFavorites } = useQuery(GET_FAVORITES);

  const favorites: TFavorite[] = favData?.favorited || [];

  const handleSubmit = async (userName?: string) => {
    const userNameToUse = userName || userNameSearchValue;
    dispatch({ type: "loading" });
    await fetch(`http://localhost:3001/gist/username/${userNameToUse}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "success", gists: data, userName: userNameToUse });
      })
      .catch((error) => {
        dispatch({ type: "error" });
      });
    history.push(`/gists/username/${userNameToUse}`);
  };

  return (
    <AppEl>
      <Header setUserNameSearchValue={setUserNameSearchValue} onSubmit={handleSubmit} />
      <Content>
        <Favorites loading={favLoading} favorites={favorites} />
        <Switch>
          <Route path="/gists/username/:userName/gistId/:gistId">
            <Detail
              onClick={handleSubmit}
              favorites={favorites}
              refetchFavorites={refetchFavorites}
            />
          </Route>
          <Route path="/gists/username/:userName">
            <Gists
              gists={state.gists}
              error={state.error}
              loading={state.loading}
              favorites={favorites}
              refetchFavorites={refetchFavorites}
            />
          </Route>
          <Route path="/gists/favorite/:gistId">
            <Detail
              onClick={handleSubmit}
              favorites={favorites}
              refetchFavorites={refetchFavorites}
            />
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
