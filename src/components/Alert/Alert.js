import React from "react";
import { Message } from "semantic-ui-react";

const Alert = ({ message, type = "success" }) => {
  return (
    <Message
      color={type === "error" ? "red" : "green"}
      className="floating__message"
      compact
      content={message}
    />
  );
};

export default Alert;
