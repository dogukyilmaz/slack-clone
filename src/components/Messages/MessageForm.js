import React, { useState } from "react";
import { Segment, Input, Button } from "semantic-ui-react";
import { v4 } from "uuid";
import firebase from "../../firebase";
import FileModal from "./FileModal";
import ProgressBar from "./ProgressBar";

const MessageForm = ({ messagesRef, channel, user }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [storageRef] = useState(firebase.storage().ref());
  const [uploadState, setUploadState] = useState("");
  // const [uploadTask, setUploadTask] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const sendMessage = async () => {
    if (message && message.trim().length > 0) {
      setLoading(true);
      try {
        // send message
        await messagesRef.child(channel.id).push().set(messageBuilder());
        setMessage("");
        setError(null);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    } else {
      setError({ message: "Add a message." });
    }
  };

  const messageBuilder = (fileUrl = null) => {
    const returnMsg = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
      },
    };
    if (fileUrl) {
      returnMsg["image"] = fileUrl;
    } else {
      returnMsg["content"] = message;
    }
    return returnMsg;
  };

  const sendFileMessage = (fileUrl, ref, uploadPath) => {
    ref
      .child(uploadPath)
      .push()
      .set(messageBuilder(fileUrl))
      .then(() => {
        setUploadState("done");
      })
      .catch((err) => {
        setError(err);
        console.log(err, "1");
      });
  };

  const uploadFile = async (file, metadata) => {
    // pathToUpload = channel.id
    // ref = messagesRef
    var filePath = `chat/public/${v4()}.jpg`;

    setUploadState("uploading");

    const uploadTask = storageRef.child(filePath).put(file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let percentUploaded = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadPercentage(percentUploaded);
        // switch (snapshot.state) {
        //   case firebase.storage.TaskState.PAUSED: // or 'paused'
        //     console.log("Upload is paused");
        //     setUploadState('paused');
        //     break;
        //   case firebase.storage.TaskState.RUNNING: // or 'running'
        //     console.log("Upload is running");
        //     setUploadState('uploading');
        //     break;
        //   default:
        //     return;
        // }
      },
      (error) => {
        // Handle unsuccessful uploads
        setError(error);
        console.log(error, "2");
        setUploadState("error");
      },
      () => {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((downloadURL) => {
            console.log(downloadURL);
            console.log(messagesRef);
            console.log(filePath);
            sendFileMessage(downloadURL, messagesRef, channel.id);
          })
          .catch((err) => {
            setError(err);
            console.log(err, "3");
            setUploadState("error");
          });
      }
    );
  };

  const addEmoji = () => {};

  return (
    <Segment className="message__form" clearing>
      <ProgressBar
        uploadState={uploadState}
        uploadPercentage={uploadPercentage}
      />
      <Input
        fluid
        name="message"
        style={{ marginBottom: "0.7em" }}
        label={<Button icon="add" />}
        labelPosition="left"
        placeholder="Write Your Message..."
        className={error ? "error" : ""}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button.Group icon floated="right">
        <Button color="pink" icon="smile outline" onClick={addEmoji} />
        <Button
          color="teal"
          // content="Upload Media"
          // labelPosition="left"
          icon="cloud upload"
          onClick={() => setModal(true)}
        />
        <Button
          color="orange"
          content="Add Reply"
          labelPosition="left"
          icon="paper plane outline"
          disabled={loading}
          loading={loading}
          onClick={sendMessage}
        />
      </Button.Group>
      <FileModal
        modal={modal}
        closeModal={() => setModal(false)}
        uploadFile={uploadFile}
      />
    </Segment>
  );
};

export default MessageForm;
