import React from "react";
import { Header, Divider, Button } from "semantic-ui-react";

export default function WorkspaceItem(props) {
  const { name, workspaceId } = props;
  return (
    <div>
      <Divider />
      <a
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          paddingTop: ".75rem",
        }}
        href={`/view-workspace/${workspaceId}`}
      >
        <span>
          <Header size="tiny">
            {name}
            <Header.Subheader>
              {`http://localhost:3000/view-workspace/${workspaceId}`}
            </Header.Subheader>
          </Header>
        </span>
        <span style={{ display: "inline" }}>
          <Button float="right">
            <b>Launch</b>
          </Button>
        </span>
      </a>
    </div>
  );
}
