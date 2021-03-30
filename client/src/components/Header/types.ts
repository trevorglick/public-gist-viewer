import React from "react";

export interface IUserNameSearch {
  userNameValue: string;
  setUserNameSearch: React.Dispatch<React.SetStateAction<string>>;
}
