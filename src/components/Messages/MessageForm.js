import React, { useState } from "react";
import { Segment, Input, Button } from "semantic-ui-react";
import firebase from "../../firebase";

const MessageForm = ({ messagesRef, channel, user }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    if (message && message.trim().length > 0) {
      setLoading(true);
      try {
        // send message
        await messagesRef.child(channel.id).push().set(messageBuilder());
        setMessage("");
        setError(null);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    } else {
      setError({ message: "Add a message." });
    }
  };

  const messageBuilder = () => {
    return {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
      },
      content: message,
    };
  };

  const uploadFile = () => {};

  const addEmoji = () => {};

  return (
    <Segment className="message__form" clearing>
      <Input
        fluid
        name="message"
        style={{ marginBottom: "0.7em" }}
        label={<Button icon="add" />}
        labelPosition="left"
        placeholder="Write Your Message..."
        className={error ? "error" : ""}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button.Group icon floated="right">
        <Button color="pink" icon="smile outline" onClick={addEmoji} />
        <Button
          color="teal"
          // content="Upload Media"
          // labelPosition="left"
          icon="cloud upload"
          onClick={uploadFile}
        />
        <Button
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="paper plane outline"
          disabled={loading}
          loading={loading}
          onClick={sendMessage}
        />
      </Button.Group>
    </Segment>
  );
};

export default MessageForm;
