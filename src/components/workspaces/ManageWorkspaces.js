import React, { Component } from "react";
import {
  Icon,
  Divider,
  Button,
  Header,
  Message,
  Input,
} from "semantic-ui-react";
import WorkspaceItem from "./WorkspaceItem";
import { signOut } from "../../util/auth";

export default class ManageWorkspaces extends Component {
  state = {
    nameError: null,
    name: "",
    workspaces: null,
  };

  async componentDidMount() {
    const { id: userId } = this.props.user;
    try {
      const res = await fetch(
        `http://localhost:8080/api/workspaces?userID=${userId}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      const { workspaces } = await res.json();
      this.setState({ workspaces }, () => console.log(this.state));
    } catch (e) {
      console.log(e);
    }
  }

  renderWorkspaces = () => {
    if (!this.state.workspaces) return;
    return this.state.workspaces.map((workspace) => {
      return (
        <WorkspaceItem
          name={workspace.name}
          workspaceId={workspace.id}
          key={workspace.id}
        />
      );
    });
  };

  handleOnChange = (e) => {
    this.setState({ name: e.target.value });
  };

  createWorkspace = async () => {
    const { id: userId } = this.props.user;
    const { name } = this.state;
    console.log(name);
    if (name === undefined || name === "")
      return this.setState({ nameError: "workspace name must have a value" });
    const newWorkspace = JSON.stringify({ owner: userId, name });
    try {
      const res = await fetch("http://localhost:8080/api/workspaces", {
        method: "POST",
        "Content-Type": "application/json",
        body: newWorkspace,
      });
      if (res.status !== 201) {
        const text = await res.text();
        if (text.includes("duplicate")) {
          return this.setState({
            nameError:
              "you are already the owner of a workspace with this name",
          });
        }
        return this.props.history.push(`/server-error/${res.status}`);
      }
      const json = await res.json();
      console.log(json);
      const { workspaceID } = json;
      return this.props.history.push(`/view-workspace/${workspaceID}`);
    } catch (err) {
      console.log(err);
      this.props.history.push("/server-error/500");
    }
  };

  render() {
    const { email } = this.props.user;
    return (
      <div className="create-workspace-container">
        <Message info style={{ width: "60%" }}>
          <span>
            Confirmed as <b>{email}</b>
          </span>
          <span>
            <button
              onClick={signOut}
              style={{
                border: 0,
                padding: 0,
                textDecoration: "none",
                float: "right",
                background: 0,
                font: "inherit",
              }}
            >
              <a href="/login">use another address</a>
            </button>
          </span>
        </Message>
        <div style={{ width: "60%", padding: "1rem 0 1rem 0" }}>
          <Header size="large" style={{ textAlign: "left" }}>
            Your Workspaces
            <Header.Subheader
              className="create-team-subheader"
              style={{ textAlign: "left" }}
            >
              {this.state.workspaces
                ? "You're already a member of these teams"
                : "It looks like you're not a part of any workspaces yet"}
            </Header.Subheader>
          </Header>
          {this.renderWorkspaces()}
        </div>
        <Divider style={{ height: "10px", width: "60%" }} />
        <div style={{ width: "60%", padding: "1rem 0 1rem 0" }}>
          <Header size="large" style={{ textAlign: "left" }}>
            Create a New Workspace
            <Header.Subheader
              className="create-team-subheader"
              style={{ textAlign: "left" }}
            >
              Add a workspace for your team
            </Header.Subheader>
          </Header>
        </div>
        <div style={{ width: "60%", paddingBottom: "1rem" }}>
          <Input
            style={{ width: "70%" }}
            placeholder="name"
            onChange={this.handleOnChange}
          />
        </div>
        <div style={{ width: "60%" }}>
          <Button basic floated="left" onClick={this.createWorkspace}>
            <Icon name="plus" />
            <span style={{ marginLeft: "5px" }}>
              <b>Create a New Workspace</b>
            </span>
          </Button>
        </div>
        <Message
          negative
          style={{ width: "60%" }}
          hidden={!this.state.nameError}
        >
          <span>{this.state.nameError}</span>
        </Message>
      </div>
    );
  }
}
