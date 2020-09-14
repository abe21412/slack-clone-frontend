import React, { useState } from "react";
import styled from "styled-components";
import { Icon, Divider, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateChannelModal from "./CreateChannelModal";
import { signOut } from "../../../util/auth";

const ChannelContainer = styled.div`
  grid-column: 2;
  grid-row: 2 / 4;
  background-color: #3f0e40;
  color: #958993;
`;

const WorkspaceNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

const paddingLeft = "padding-left: 10px";

const SideBarListItem = styled.li`
  padding: 2px;
  font-weight: 400;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

const SideBarListHeader = styled.li`
  font-weight: 500;
  font-size: 15px;
  ${paddingLeft};
  cursor: pointer;
`;

const iconStyle = { float: "right", marginRight: "20px" };

const PushLeft = styled.div`
  ${paddingLeft};
`;

const Green = styled.span`
  color: #38978d;
`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : "○");

const channel = ({ id, name }) => (
  <SideBarListItem key={id}># {name}</SideBarListItem>
);

const dmChannel = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble /> {name}
  </SideBarListItem>
);

const SidebarHeader = (props) => (
  <Dropdown
    style={{ width: "100%", color: "white", fontSize: "20px" }}
    text={props.text}
  >
    <Dropdown.Menu style={{ marginTop: "10px", marginLeft: "20px" }}>
      <Dropdown.Item onClick={signOut}>
        <Link style={{ color: "black" }} to={{ pathname: "/login" }}>
          Sign Out
        </Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link
          style={{ color: "black" }}
          to={{ pathname: "/manage-workspaces" }}
        >
          Add Workspaces
        </Link>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const ChannelsSidebar = ({
  selectedWorkspace,
  user,
  channels,
  onInvitePeopleClick,
  onDirectMessageClick,
}) => {
  const trueChannels = channels.filter((c) => !c.dm);
  const dmChannels = channels.filter((c) => c.dm);
  const createChannelModalTrigger = (
    <SideBarListHeader>
      Channels <Icon style={iconStyle} name="plus" />
    </SideBarListHeader>
  );

  return (
    <ChannelContainer>
      <Divider style={{ marginTop: 0 }} />
      <PushLeft>
        <div>
          <SidebarHeader text={selectedWorkspace.name} />
        </div>
      </PushLeft>
      <Divider />
      <PushLeft>{user.displayName}</PushLeft>
      <div>
        <SideBarList>
          <CreateChannelModal
            trigger={createChannelModalTrigger}
            user={user}
            selectedWorkspace={selectedWorkspace}
          />
          {trueChannels.map((c) => channel(c))}
        </SideBarList>
      </div>
      <div>
        <SideBarList>
          <SideBarListHeader>
            Direct Messages{" "}
            <Icon
              style={iconStyle}
              onClick={onDirectMessageClick}
              name="plus"
            />
          </SideBarListHeader>
          {dmChannels.map((dmC) => dmChannel(dmC))}
        </SideBarList>
      </div>
      <PushLeft>
        <div onClick={onInvitePeopleClick}>+ Invite People</div>
      </PushLeft>
    </ChannelContainer>
  );
};

export default ChannelsSidebar;
