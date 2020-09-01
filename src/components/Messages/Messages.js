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
  const [filterState, setFilterState] = useState({
    searchTerm: "",
    searchLoading: false,
    searchResults: [],
  });

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

  const handleSearch = (e) => {
    setFilterState({
      ...filterState,
      searchTerm: e.target.value,
      searchLoading: true,
    });
  };

  useEffect(() => {
    const allMessages = [...messages];
    const regex = new RegExp(
      filterState.searchTerm && filterState.searchTerm,
      "gi"
    );
    const res = allMessages.reduce((acc, msg) => {
      if (
        (msg.content && msg.content.match(regex)) ||
        msg.user.name.match(regex)
      ) {
        acc.push(msg);
      }
      return acc;
    }, []);

    setFilterState({
      ...filterState,
      searchResults: res,
      searchLoading: false,
    });
    // eslint-disable-next-line
  }, [filterState.searchTerm, messages]);

  const displayMessages = (messages) => {
    return (
      messages.length > 0 &&
      messages.map((msg, idx) => (
        <Message key={idx} message={msg} user={user} /> //key msg.timestamp ?
      ))
    );
  };

  return (
    <>
      <MessagesHeader
        channel={channel}
        users={uniqueUsers}
        handleSearch={handleSearch}
        loading={filterState.searchLoading}
      />
      <Segment>
        <Comment.Group className="messages">
          {/* Messages */}
          {loading ? (
            <Spinner
              isInverted={true}
              size="medium"
              loadingMessage="Loading Messages..."
            />
          ) : filterState.searchTerm ? (
            displayMessages(filterState.searchResults)
          ) : (
            displayMessages(messages)
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
