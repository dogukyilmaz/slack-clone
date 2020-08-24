import React, { useState, useEffect, useCallback } from "react";
import firebase from "../../firebase";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

const Channels = ({ user }) => {
  const [channels, setChannels] = useState([]);
  const [modal, setModal] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDetail, setChannelDetail] = useState("");
  const [channelsRef] = useState(firebase.database().ref("channels"));

  const addListenerss = useCallback(() => {
    channelsRef.on("child_added", (snap) => {
      setChannels((chs) => [snap.val(), ...chs]);
    });
  }, [channelsRef]);

  useEffect(() => {
    addListenerss();
  }, [addListenerss]);

  // const addListeners = () => {
  //   channelsRef.on("child_added", (snap) => {
  //     setChannels((chs) => [snap.val(), ...chs]);
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      addChannel();
    }
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
          <Icon name="add" className="button" onClick={() => setModal(true)} />
        </Menu.Item>

        {/* Channel List */}
        {channels.length > 0 &&
          channels.map((ch) => (
            <Menu.Item
              key={ch.id}
              onClick={() => console.log(ch)}
              name={ch.Name}
              style={{ opacitiy: 0.7 }}
            >
              # {ch.name}
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
};
Channels.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
});

export default connect(mapStateToProps, {})(Channels);
