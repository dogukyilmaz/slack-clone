import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

const Spinner = ({
  isInverted = false,
  size = "medium",
  loadingMessage = "Loading",
}) => {
  return (
    <Dimmer active inverted={isInverted}>
      <Loader size={size} content={loadingMessage} />
    </Dimmer>
  );
};

export default Spinner;
