import React from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { faStar as favorite } from "@fortawesome/free-solid-svg-icons";
import { faStar as notfavorite } from "@fortawesome/free-regular-svg-icons";

import { LoadingIndicator } from "../LoadingIndicator";
import {
  Error,
  GistsEl,
  GistContainer,
  StyledNavLink,
  StyledFontAwesomeIcon,
  FavoriteButton
} from "./Gists.style";
import { TFavorite } from "../Favorites/types";
import { SET_FAVORITED } from "../../graphql/mutations";

interface IGistsProps {
  gists: any[];
  favorites: TFavorite[];
  error: boolean;
  loading: boolean;
  refetchFavorites: () => void;
}

interface IParams {
  userName: string;
}

export const Gists: React.FunctionComponent<IGistsProps> = (props) => {
  const { error, gists, loading, favorites, refetchFavorites } = props;
  const { userName } = useParams<IParams>();
  const [setFavorite] = useMutation(SET_FAVORITED, {
    onCompleted: () => {
      refetchFavorites();
    }
  });

  const handleFavorite = (gist: any, favorited: boolean) => {
    setFavorite({
      variables: {
        id: gist.id,
        userName: gist.owner.login,
        description: gist.description,
        favorited
      }
    });
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <GistsEl>
        <Error>No user matching the username: {userName}. Check the username and try again.</Error>
      </GistsEl>
    );
  }

  if (gists.length === 0) {
    return (
      <GistsEl>
        <div>{userName} doesn't have any gists.</div>
      </GistsEl>
    );
  }

  const favoriteItems = gists.filter((gist) => {
    return favorites.some((favorite) => {
      return gist.id === favorite.id;
    });
  });

  return (
    <GistsEl>
      Showing Gists for {userName}
      {gists.map((gist) => {
        if (gist.description === "") return null;
        return (
          <GistContainer key={gist.id}>
            {favoriteItems.includes(gist) ? (
              <FavoriteButton onClick={() => handleFavorite(gist, false)}>
                <StyledFontAwesomeIcon size="2x" icon={favorite} />
              </FavoriteButton>
            ) : (
              <FavoriteButton onClick={() => handleFavorite(gist, true)}>
                <StyledFontAwesomeIcon size="2x" icon={notfavorite} />
              </FavoriteButton>
            )}
            <div>
              <StyledNavLink to={`/gists/username/${gist.owner.login}/gistId/${gist.id}`}>
                {gist.description}
              </StyledNavLink>
              Created on: {gist.created_at}
            </div>
          </GistContainer>
        );
      })}
    </GistsEl>
  );
};
