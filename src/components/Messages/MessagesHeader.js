import React from "react";
import { Segment, Header, Icon, Input } from "semantic-ui-react";
import Spinner from "../Spinner";

const displayChannelName = (channel) =>
  channel ? (
    `# ${channel.name}`
  ) : (
    <Spinner isInverted loadingMessage="" size="small" />
  );

const MessagesHeader = ({ channel, users }) => {
  return (
    <Segment clearing>
      {/* Channel Title */}
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          {displayChannelName(channel)}{" "}
          <Icon name="star outline" color="black" />
        </span>
        <Header.Subheader>
          {users.length} {users.length > 1 ? "Users" : "User"}
        </Header.Subheader>
      </Header>
      {/* Channel Search */}
      <Header floated="right">
        <Input
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
        />
      </Header>
    </Segment>
  );
};

export default MessagesHeader;
