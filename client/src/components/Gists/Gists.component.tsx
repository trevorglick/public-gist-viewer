import React from "react";

import { LoadingIndicator } from "../LoadingIndicator";
import { Error, GistsEl, GistContainer } from "./Gists.style";

interface IGistsProps {
  gists: any[];
  error: boolean;
  loading: boolean;
}

export const Gists: React.FunctionComponent<IGistsProps> = (props) => {
  const { error, gists, loading } = props;

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <GistsEl>
        <Error>No user matching the searched username. Check the username and try again.</Error>
      </GistsEl>
    );
  }

  if (gists.length === 0) {
    return (
      <GistsEl>
        <div>This user doesn't have any gists.</div>
      </GistsEl>
    );
  }

  return (
    <GistsEl>
      {gists.map((gist) => {
        return <GistContainer key={gist.id}>{gist.description}</GistContainer>;
      })}
    </GistsEl>
  );
};
