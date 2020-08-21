import React from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { clearUser } from "../../redux/actions";
import PropTypes from "prop-types";
import firebase from "../../firebase";

const UserPanel = ({ user }) => {
  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as{" "}
          <strong>
            {user && user.displayName ? user.displayName : "User"}
          </strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>,
    },
    {
      key: "signout",
      text: <span onClick={handleLogout}>Sign Out</span>,
    },
  ];

  const handleLogout = async () => {
    await firebase.auth().signOut();
  };

  return (
    <div>
      <Grid style={{ background: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>Slacklone</Header.Content>
            </Header>
          </Grid.Row>
          {/* User Dropdown */}
          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image
                    src={user && user.photoURL && user.photoURL}
                    spaced="right"
                    avatar
                  />
                  {user && user.displayName ? user.displayName : "User"}
                </span>
              }
              options={dropdownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    </div>
  );
};

UserPanel.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
});

export default connect(mapStateToProps, { clearUser })(UserPanel);
