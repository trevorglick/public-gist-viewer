import { gql } from "apollo-server-express";

export const schema = gql`
  type Query {
    favorited: [Favorite!]
    getFavorite(id: String!): Favorite! 
  }

  type Favorite {
    id: String!
    userName: String!
    description: String!
    favorited: Boolean!
  }

  type Mutation {
    setFavorited(id: String!, userName: String!, description: String!, favorited: Boolean!): Favorite!
  }
`;
