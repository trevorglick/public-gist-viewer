import React from "react";

export const Instructions: React.FunctionComponent = () => {
  return (
    <div>
      <div>Welcome to the github gist searchario program!</div>
      <p>
        To get started, enter a username to search for in the above search bar. If the username
        exists, you will see their gists if they have any.
      </p>
      <p>
        Clicking a star button will favorite or unfavorite a gist. Favorited gists will appear on
        the left side under the Favorites header.
      </p>
    </div>
  );
};
