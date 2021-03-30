import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const HeaderEl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  background-color: grey;
  height: 80px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: white;
  padding-right: 8px;
`;

export const Title = styled.div`
  color: white;
  font-size: 20px;
  padding-right: 20px;
`;
