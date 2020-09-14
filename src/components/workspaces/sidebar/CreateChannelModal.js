import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Modal } from "semantic-ui-react";
import { createChannel } from "../../../util/API";
import { fetchChannelsForWorkspaceAndUser } from "../../../stateSlices/channelsSlice";

function CreateChannelModal(props) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [isPrivate, setIsPrivate] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDesc, setChannelDesc] = useState("");

  const handleChange = (e, setter) => setter(e.target.value);

  const handleClick = async () => {
    if (channelName === "") return;
    try {
      await createChannel(
        {
          name: channelName,
          description: channelDesc,
          public: !isPrivate,
          workspaceId: props.selectedWorkspace.id,
        },
        props.user.id
      );
      dispatch(
        fetchChannelsForWorkspaceAndUser({
          userId: props.user.id,
          workspaceId: props.selectedWorkspace.id,
        })
      );
    } catch (err) {
      console.log(err);
    }
    setOpen(false);
  };

  return (
    <Modal
      style={{ width: "40%" }}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={props.trigger}
      size="large"
    >
      <Modal.Header>
        {isPrivate ? "Create A Private Channel" : "Create A Channel"}
      </Modal.Header>
      <Modal.Content>
        <Modal.Description style={{ paddingBottom: "10px" }}>
          <p style={{ fontSize: "15px" }}>
            Channels are where your team communicates. They’re best when
            organized around a topic — #marketing, for example.
          </p>
        </Modal.Description>
        <Form>
          <Form.Field>
            <label style={{ fontSize: "15px" }}>Name</label>
            <input onChange={(e) => handleChange(e, setChannelName)} />
          </Form.Field>
          <Form.Field>
            <label style={{ fontSize: "15px" }}>Description (optional)</label>
            <input onChange={(e) => handleChange(e, setChannelDesc)} />
          </Form.Field>

          <label style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "60%" }}>
              <Modal.Description>
                <h4>
                  <strong>Make Private</strong>
                </h4>
                {isPrivate ? (
                  <p style={{ fontSize: "15px" }}>
                    Are you sure? Private channels cannot be made public.{" "}
                  </p>
                ) : (
                  <p style={{ fontSize: "15px" }}>
                    When a channel is set to private, it can only be viewed or
                    joined by invitation.
                  </p>
                )}
              </Modal.Description>
            </div>
            <div style={{ position: "relative" }}>
              <input
                ref={inputRef}
                onClick={() => setIsPrivate(inputRef.current.checked)}
                className="make-private-input"
                type="checkbox"
              />
              <div className="animations-handler" tabIndex={-1} />
            </div>
          </label>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Create"
          labelPosition="right"
          icon="checkmark"
          onClick={handleClick}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default CreateChannelModal;
