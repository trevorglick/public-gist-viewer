import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { faStar as favorite } from "@fortawesome/free-solid-svg-icons";
import { faStar as notfavorite } from "@fortawesome/free-regular-svg-icons";

import { DetailEl, TitleContainer, TopContainer, FileContainer, UserName } from "./Detail.style";
import { Error, FavoriteButton, StyledFontAwesomeIcon } from "../";
import { TFavorite } from "../../Favorites/types";
import { SET_FAVORITED } from "../../../graphql/mutations";

interface IDetailProps {
  favorites: TFavorite[];
  onClick: (userName: string) => void;
  refetchFavorites: () => void;
}

interface IParams {
  gistId: string;
}

interface IData {
  id: string;
  userName: string;
  description: string;
  files: any;
}

export const Detail: React.FunctionComponent<IDetailProps> = (props) => {
  const { onClick, favorites, refetchFavorites } = props;
  const { gistId } = useParams<IParams>();
  const [data, setData] = useState<IData>({ id: "", userName: "", description: "", files: {} });
  const [error, setError] = useState<boolean>(false);

  const [setFavorite] = useMutation(SET_FAVORITED, {
    onCompleted: () => {
      refetchFavorites();
    }
  });

  const handleFavorite = (data: IData, favorited: boolean) => {
    setFavorite({
      variables: {
        id: data.id,
        userName: data.userName,
        description: data.description,
        favorited
      }
    });
  };

  const getSpecificGistById = async () => {
    await fetch(`http://localhost:3001/gist/gistId/${gistId}`)
      .then((res) => res.json())
      .then((data) => {
        const selectedData: IData = {
          id: data.id,
          userName: data.owner.login,
          description: data.description,
          files: data.files
        };
        setData(selectedData);
      })
      .catch((error) => {
        setError(true);
      });
    // Testing the below fetch to get around the rate limiting
    // await fetch("http://localhost:3001/file", {
    //   headers: { "Content-Type": "application/json", Accept: "application/json" }
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("data");
    //     const selectedData: IData = {
    //       id: data.id,
    //       userName: data.owner.login,
    //       description: data.description,
    //       files: data.files
    //     };
    //     setData(selectedData);
    //   })
    //   .catch((error) => {
    //     console.log("error");
    //     setError(true);
    //   });
  };

  useEffect(() => {
    getSpecificGistById();
  }, [gistId]);

  if (error) {
    return <Error>There was an issue getting this specific gist.</Error>;
  }

  const filesList = Object.keys(data.files);

  const isFavorite = () => {
    const foundFavorite = favorites.filter((favorite: TFavorite) => favorite.id === data.id);
    if (foundFavorite.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <DetailEl>
      <TopContainer>
        <div>
          {isFavorite() ? (
            <FavoriteButton onClick={() => handleFavorite(data, false)}>
              <StyledFontAwesomeIcon size="2x" icon={favorite} />
            </FavoriteButton>
          ) : (
            <FavoriteButton onClick={() => handleFavorite(data, true)}>
              <StyledFontAwesomeIcon size="2x" icon={notfavorite} />
            </FavoriteButton>
          )}
        </div>
        <div>
          <TitleContainer>
            <UserName>
              UserName:{" "}
              <NavLink
                to={`/gists/username/${data.userName}`}
                onClick={() => onClick(data.userName)}
              >
                {data.userName}
              </NavLink>
            </UserName>
            <div>ID: {data.id}</div>
          </TitleContainer>
        </div>
      </TopContainer>
      {data.description ? <div>description: {data.description}</div> : null}

      <FileContainer>
        <p>Files in this Gist:</p>
        <ul>
          {filesList.map((file) => {
            return <li key={file}>{file}</li>;
          })}
        </ul>
      </FileContainer>
    </DetailEl>
  );
};
