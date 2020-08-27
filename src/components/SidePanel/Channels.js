import React, { useState, useEffect, useCallback, memo } from "react";
import firebase from "../../firebase";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setCurrentChannel, clearCurrentChannel } from "../../redux/actions";

const Channels = memo(
  ({ user, channel, setCurrentChannel, clearCurrentChannel }) => {
    const [channels, setChannels] = useState([]);
    const [modal, setModal] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [channelName, setChannelName] = useState("");
    const [channelDetail, setChannelDetail] = useState("");
    const [channelsRef] = useState(firebase.database().ref("channels"));

    const addListenerss = useCallback(() => {
      channelsRef.on("child_added", (snap) => {
        setChannels((chs) => [...chs, snap.val()]);
      });
    }, [channelsRef]);

    const setFirstChannelOnFirstLoad = useCallback(() => {
      if (firstLoad && channels.length > 0) {
        setCurrentChannel(channels[0]);
        setFirstLoad(false);
      }
    }, [setCurrentChannel, channels, firstLoad]);

    const removeListener = useCallback(() => {
      channelsRef.off();
    }, [channelsRef]);

    useEffect(() => {
      addListenerss();
      return () => removeListener();
    }, [addListenerss, removeListener]);

    useEffect(() => {
      setFirstChannelOnFirstLoad();
    }, [channels, setFirstChannelOnFirstLoad]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (isFormValid()) {
        addChannel();
      }
    };

    const changeChannel = (channel) => {
      setCurrentChannel(channel);
    };

    const addChannel = async () => {
      const key = channelsRef.push().key;

      const newChannel = {
        id: key,
        name: channelName,
        details: channelDetail,
        createdBy: {
          name: user.displayName,
          avatar: user.photoURL,
        },
      };

      try {
        await channelsRef.child(key).update(newChannel);
        setModal(false);
        setChannelName("");
        setChannelDetail("");
        // TODO: ALERT
      } catch (err) {
        console.log(err);
        // TODO: ALERT
      }
    };

    const isFormValid = () => channelName && channelDetail;

    return (
      <>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> Channels
            </span>{" "}
            ({channels.length}){" "}
            <Icon name="add" onClick={() => setModal(true)} />
          </Menu.Item>

          {/* Channel List */}
          {channels.length > 0 &&
            channels.map((ch) => (
              <Menu.Item
                key={ch.id}
                onClick={() => {
                  if (
                    channel.currentChannel &&
                    channel.currentChannel.id === ch.id
                  )
                    return;
                  changeChannel(ch);
                }}
                name={ch.Name}
                style={{ opacitiy: 0.7 }}
                className={
                  channel.currentChannel && channel.currentChannel.id === ch.id
                    ? "ui header blue"
                    : "ui"
                }
              >
                # {ch.name}
                {channel.currentChannel &&
                  channel.currentChannel.id === ch.id && (
                    <Icon name="remove" onClick={() => clearCurrentChannel()} />
                  )}
              </Menu.Item>
            ))}
        </Menu.Menu>

        <Modal
          basic
          open={modal}
          style={{ width: 500 }}
          onClose={() => setModal(false)}
        >
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="Detail of Channel"
                  name="channelDetail"
                  value={channelDetail}
                  onChange={(e) => setChannelDetail(e.target.value)}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" onClick={() => setModal(false)}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
);

Channels.propTypes = {
  user: PropTypes.object,
  channel: PropTypes.object,
  setCurrentChannel: PropTypes.func,
  clearCurrentChannel: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
  channel: state.channel,
});

export default connect(mapStateToProps, {
  setCurrentChannel,
  clearCurrentChannel,
})(Channels);
