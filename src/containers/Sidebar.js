/* eslint-disable react/prop-types */
import React from "react";

import decode from "jwt-decode";

import Channels from "../components/Channels";
import Teams from "../components/Teams";
import AddChannelModal from "../components/AddChannelModal";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddChannelModal: false,
    };
    this.handleCloseAddChannelModal = () => {
      this.setState({ openAddChannelModal: false });
    };

    this.handleAddChannelClick = () => {
      this.setState({ openAddChannelModal: true });
    };
  }

  render() {
    const { teams, team } = this.props;

    let username = "";
    try {
      const token = localStorage.getItem("token");
      const { user } = decode(token);
      // eslint-disable-next-line prefer-destructuring
      username = user.username;
    } catch (err) {
      return null;
    }

    return [
      <Teams key="team-sidebar" teams={teams} />,
      <Channels
        key="channels-sidebar"
        teamName={team.name}
        username={username}
        teamId={team.id}
        channels={team.channels}
        users={[
          { id: 1, name: "slackbot" },
          { id: 2, name: "user1" },
        ]}
        onAddChannelClick={this.handleAddChannelClick}
      />,
      <AddChannelModal
        teamId={team.id}
        onClose={this.handleCloseAddChannelModal}
        open={this.state.openAddChannelModal}
        key="sidebar-add-channel-modal"
      />,
    ];
  }
}
