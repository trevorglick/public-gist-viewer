import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const LoadingIndicator: React.FunctionComponent = () => {
  return <FontAwesomeIcon icon={faSpinner} size={"5x"} spin />;
};
