import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import Sidebar from "./sidebar";
import {
  fetchWorkspacesForUser,
  fetchWorkspacesSelector,
} from "../../stateSlices/workspacesSlice";
import Header from "../Header";
import {
  fetchChannelsForWorkspaceAndUser,
  fetchChannelsSelector,
} from "../../stateSlices/channelsSlice";

export default function Workspace(props) {
  const { id: userId } = props.user;
  const { id: workspaceId } = useParams();
  const { workspaces: availableWorkspaces, loading } = useSelector(
    fetchWorkspacesSelector
  );
  const selectedWorkspace = availableWorkspaces.find(
    (w) => w.id === workspaceId
  );
  const { channels } = useSelector(fetchChannelsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWorkspacesForUser(userId));
    dispatch(fetchChannelsForWorkspaceAndUser({ userId, workspaceId }));
  }, [userId, workspaceId, dispatch]);

  if (
    (availableWorkspaces === undefined || selectedWorkspace === undefined) &&
    loading
  ) {
    return <Loader active size="massive" />;
  } else if (
    !loading &&
    (availableWorkspaces.length === 0 ||
      !availableWorkspaces.map((w) => w.id).includes(workspaceId))
  ) {
    return <Redirect to={{ pathname: "/manage-workspaces" }} />;
  } else {
    return (
      <div className="workspace-container">
        <Header channelName="test" />
        <Sidebar
          availableWorkspaces={availableWorkspaces}
          selectedWorkspace={selectedWorkspace}
          user={props.user}
          channels={channels}
        />
      </div>
    );
  }
}
