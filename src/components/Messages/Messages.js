import React, { useState, useEffect, useCallback, memo } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from "../../firebase";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Message from "./Message";
import Spinner from "../Spinner";

const Messages = memo(({ channel, user }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messagesRef] = useState(firebase.database().ref("messages"));
  const [uniqueUsers, setUniqueUsers] = useState([]);

  // FIXME: renders much

  const countUniqueUsers = useCallback(
    (val) => {
      if (channel) {
        const uid = val.user.id;
        if (!uniqueUsers.includes(uid)) {
          setUniqueUsers([...uniqueUsers, uid]);
        }
      }
    },
    [uniqueUsers, channel]
  );

  const addListeners = useCallback(() => {
    setMessages([]);
    if (channel) {
      messagesRef.child(channel.id).on("child_added", (snap) => {
        setMessages((messages) => [snap.val(), ...messages]);
        countUniqueUsers(snap.val());
      });
      setLoading(false);
    }
  }, [messagesRef, channel, countUniqueUsers]);

  const removeListener = useCallback(() => {
    messagesRef.off();
  }, [messagesRef]);

  useEffect(() => {
    if (channel && user) {
      addListeners();
    }
    return () => removeListener();
  }, [channel, user, addListeners, removeListener]);

  useEffect(() => {
    setUniqueUsers([]);
  }, [channel]);

  return (
    <>
      <MessagesHeader channel={channel} users={uniqueUsers} />
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
});

Messages.propTypes = {
  channel: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  channel: state.channel.currentChannel,
  user: state.user.currentUser,
});

export default connect(mapStateToProps, {})(Messages);
