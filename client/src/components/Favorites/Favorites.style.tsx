import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const FavoritesEl = styled.div`
  width: 150px;
  padding-right: 16px;
`;

export const Label = styled.div``;

export const Favorite = styled(NavLink)`
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
