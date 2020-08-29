import React, { useState } from "react";
import mime from "mime-types";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

import { connect } from "react-redux";
import { setAlert, removeAlert } from "../../redux/actions";

const FileModal = ({
  modal,
  closeModal,
  uploadFile,
  setAlert,
  removeAlert,
}) => {
  const [file, setFile] = useState(null);
  const [fileTypes] = useState(["image/jpg", "image/png"]);

  const addFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const sendFile = () => {
    if (file) {
      if (isPermitted(file.name)) {
        // send file
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
        closeModal();
        setFile(null);
      }
    } else {
      setAlert({
        message: "Choose a file to upload...",
        type: "error",
      });
      setTimeout(() => {
        removeAlert();
      }, 3000);
    }
  };

  const isPermitted = (fileName) => fileTypes.includes(mime.lookup(fileName));

  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Select an image file</Modal.Header>
      <Modal.Content>
        <Input
          fluid
          label="File Types: jpg, png"
          name="file"
          type="file"
          onChange={addFile}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={sendFile}>
          <Icon name="checkmark" /> Send
        </Button>
        <Button color="red" inverted onClick={closeModal}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default connect(null, { setAlert, removeAlert })(FileModal);
