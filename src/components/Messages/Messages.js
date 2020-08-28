import React, { useState, useEffect, useCallback } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from "../../firebase";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Message from "./Message";
import Spinner from "../Spinner";

const Messages = ({ channel, user }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messagesRef] = useState(firebase.database().ref("messages"));

  const addListeners = useCallback(() => {
    messagesRef.child(channel.id).on("child_added", (snap) => {
      setMessages((messages) => [snap.val(), ...messages]);
      setLoading(false);
    });
  }, [messagesRef, channel]);

  const removeListener = useCallback(() => {
    messagesRef.off();
  }, [messagesRef]);

  useEffect(() => {
    if (channel && user) {
      addListeners();
    }
    return () => removeListener();
  }, [channel, user, addListeners, removeListener]);

  return (
    <>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages">
          {/* Messages */}
          {loading ? (
            <Spinner
              isInverted={true}
              size="medium"
              loadingMessage="Loading Messages..."
            />
          ) : (
            messages.length > 0 &&
            messages.map((msg, idx) => (
              <Message key={idx} message={msg} user={user} /> //key msg.timestamp ?
            ))
          )}
        </Comment.Group>
      </Segment>
      <MessageForm messagesRef={messagesRef} channel={channel} user={user} />
    </>
  );
};

Messages.propTypes = {
  channel: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  channel: state.channel.currentChannel,
  user: state.user.currentUser,
});

export default connect(mapStateToProps, {})(Messages);
