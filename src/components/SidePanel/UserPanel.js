import React from "react";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { clearUser } from "../../redux/actions";

import firebase from "../../firebase";

const UserPanel = ({ user, isLoading, clearUser }) => {
  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as{" "}
          <strong>
            {!isLoading && user.currentUser && user.currentUser.displayName
              ? user.currentUser.displayName
              : "User"}
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
    // Clear global user state
    // clearUser();
    console.log("signed out");
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
                  {!isLoading &&
                  user.currentUser &&
                  user.currentUser.displayName
                    ? user.currentUser.displayName
                    : "User"}
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

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { clearUser })(UserPanel);
