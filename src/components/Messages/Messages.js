import React, { useState } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from "../../firebase";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Messages = ({ channel, user }) => {
  const [messagesRef] = useState(firebase.database().ref("messages"));

  return (
    <>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages">{/* Messages */}</Comment.Group>
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
