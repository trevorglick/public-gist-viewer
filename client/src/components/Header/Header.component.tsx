import React from "react";
import { useHistory } from "react-router-dom";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";

import { HeaderEl, LogoContainer, StyledFontAwesomeIcon, Title } from "./Header.style";
import { UserSearch } from "./UserSearch";

interface IHeaderProps {
  onSubmit: () => void;
  setUserNameSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { onSubmit, setUserNameSearchValue } = props;
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  return (
    <HeaderEl>
      <LogoContainer onClick={handleClick}>
        <StyledFontAwesomeIcon size={"3x"} icon={faGithubSquare} />
        <Title>GitHub Gist Searchario</Title>
      </LogoContainer>
      <UserSearch setUserNameSearchValue={setUserNameSearchValue} onSubmit={onSubmit} />
    </HeaderEl>
  );
};
