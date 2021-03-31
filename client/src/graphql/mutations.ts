import { gql } from "@apollo/client";

export const SET_FAVORITED = gql`
  mutation SetFavorited(
    $id: String!
    $userName: String!
    $description: String!
    $favorited: Boolean!
  ) {
    setFavorited(id: $id, userName: $userName, description: $description, favorited: $favorited) {
      id
      userName
      description
      favorited
    }
  }
`;
