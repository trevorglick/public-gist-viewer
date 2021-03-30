import React from "react";

import {
  UserSearchButton,
  UserSearchEl,
  UserSearchInput,
  UserSearchLabel
} from "./UserSearch.style";

interface IUserSearchProps {
  onSubmit: () => void;
  setUserNameSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const UserSearch: React.FunctionComponent<IUserSearchProps> = (props) => {
  const { onSubmit, setUserNameSearchValue } = props;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameSearchValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <UserSearchEl>
        <UserSearchLabel>Search Gists by Username:</UserSearchLabel>
        <UserSearchInput type="text" onChange={(event) => handleChange(event)} />
        <UserSearchButton>Search</UserSearchButton>
      </UserSearchEl>
    </form>
  );
};
