import React from "react";

import { FavoritesEl, Label, Favorite } from "./Favorites.style";
import { TFavorite } from "./types";

interface IFavoritesProps {
  favorites: TFavorite[];
  loading: boolean;
}

export const Favorites: React.FunctionComponent<IFavoritesProps> = (props) => {
  const { loading } = props;
  const favorites: TFavorite[] = props.favorites || [];

  return (
    <FavoritesEl>
      <Label>Favorites</Label>
      {loading
        ? "..."
        : favorites.map((favorite: TFavorite) => {
            return (
              <Favorite key={favorite.id} to={`/gists/favorite/${favorite.id}`}>
                {favorite.description}
              </Favorite>
            );
          })}
    </FavoritesEl>
  );
};
