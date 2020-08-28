import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

const Spinner = ({
  isInverted = false,
  size = "medium",
  loadingMessage = "Loading",
  transparent,
}) => {
  return (
    <Dimmer
      active
      inverted={isInverted}
      style={transparent && { background: "transparent" }}
    >
      <Loader size={size} content={loadingMessage} />
    </Dimmer>
  );
};

export default Spinner;
