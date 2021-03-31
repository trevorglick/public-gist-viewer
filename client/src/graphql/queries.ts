import { gql } from "@apollo/client";

export const GET_FAVORITES = gql`
  {
    favorited {
      id
      userName
      description
      favorited
    }
  }
`;
