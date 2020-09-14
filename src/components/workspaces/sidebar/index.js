import React, { Fragment } from "react";

import ChannelsSidebar from "./ChannelsSidebar";
import WorkspaceSidebar from "./WorkspaceSidebar";
const Sidebar = ({
  availableWorkspaces,
  channels,
  selectedWorkspace,
  user,
}) => {
  return (
    <Fragment>
      <WorkspaceSidebar availableWorkspaces={availableWorkspaces} />
      <ChannelsSidebar
        channels={channels}
        selectedWorkspace={selectedWorkspace}
        user={user}
      />
    </Fragment>
  );
};

export default Sidebar;
