import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const WorkspaceSidebarContainer = styled.div`
  grid-column: 1;
  grid-row: 2 / 4;
  background-color: #362234;
  color: #958993;
`;

const WorkspacesList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`;

const WorkspacesListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`;

const renderWorkspaceItem = ({ id, name }) => (
  <Link key={`ws-${id}`} to={`/view-workspace/${id}`}>
    <WorkspacesListItem>{name[0].toUpperCase()}</WorkspacesListItem>
  </Link>
);

export default (props) => {
  const { availableWorkspaces } = props;
  return (
    <WorkspaceSidebarContainer>
      <WorkspacesList>
        {availableWorkspaces.map(renderWorkspaceItem)}
        <Link key="add-workspace" to="/manage-workspaces">
          <WorkspacesListItem>+</WorkspacesListItem>
        </Link>
      </WorkspacesList>
    </WorkspaceSidebarContainer>
  );
};
