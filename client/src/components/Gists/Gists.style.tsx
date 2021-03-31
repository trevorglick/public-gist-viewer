import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const GistsEl = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GistContainer = styled.div`
  padding-top: 8px;
  display: flex;
  flex-direction: row;
`;

export const Error = styled.div`
  color: red;
  font-size: 24px;
  width: 300px;
`;

export const StyledNavLink = styled(NavLink)`
  display: block;
`;

export const FavoriteButton = styled.button`
  padding: 0;
  margin: 0 8px 0 0;
`;

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)``;
