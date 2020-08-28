import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import Alert from "./Alert/Alert";

const Landing = ({ alert: { alertMessage, type } }) => {
  return (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
      <ColorPanel />
      <SidePanel />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages />
      </Grid.Column>
      <Grid.Column width={4}>
        {alertMessage && <Alert message={alertMessage} type={type} />}
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps, {})(Landing);
