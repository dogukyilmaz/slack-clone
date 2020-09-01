import React from "react";
import { Menu } from "semantic-ui-react";

import UserPanel from "./UserPanel";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";

import { connect } from "react-redux";
import { clearUser } from "../../redux/actions";
import PropTypes from "prop-types";

const SidePanel = ({ user }) => {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
    >
      <UserPanel user={user} />
      {/* Channels */}
      <Channels />
      {/* Direct Messages */}
      <DirectMessages user={user} />
    </Menu>
  );
};

SidePanel.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
});

export default connect(mapStateToProps, { clearUser })(SidePanel);
