import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useParams } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { database, storage } from "../../Firebase/firebase";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  image__toBeUploaded: {
    display: "flex",
    width: "65%",
    height: "30%",
    margin: "auto",
  },

  file__uploadModal: {
    color: "white",
  },

  image__messageInput: {
    backgroundColor: "#fff4",
    borderRadius: "10px",
  },
}));

function FileUploadModal({ handleFileUploadModal, mediaFile }) {
  const parameter = useParams();
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const [progressBar, setProgressBar] = React.useState({ display: "none" });
  const [userMessage, setUserMessage] = React.useState("");

  function handleSendUserMessage(event, url) {
    event.preventDefault();
    if (userMessage && parameter.id) {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      if (userDetails) {
        const displayName = userDetails.displayName;
        const profilePicture = userDetails.photoUrl;
        const userId = userDetails.uid;
        const likeCount = 0;
        const likes = {};
        const fireCount = 0;
        const fire = {};
        const heartCount = 0;
        const heart = {};
        const messageMedia = url;
        const messageInfo = {
          text: userMessage,
          timestamp: firebase.firestore.Timestamp.now(),
          userAvatar: profilePicture,
          userId: userId,
          username: displayName,
          likeCount: likeCount,
          likes: likes,
          fireCount: fireCount,
          fire: fire,
          heartCount: heartCount,
          heart: heart,
          messageMedia: messageMedia,
        };

        database
          .collection("hangouts")
          .doc(parameter.id)
          .collection("messages")
          .add(messageInfo)
          .then((result) => {
            console.log("Message has been sent succesfully.");
          })
          .catch((error) => {
            console.log(error);
          });
      }

      setUserMessage("");
    }
  }

  function handleUploadToStorageAndGetFileUrl(event) {
    event.preventDefault();
    setProgressBar({ display: "block" });
    const uploadTask = storage.ref(`Media/${mediaFile.name}`).put(mediaFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },

      (error) => {
        console.log(error);
      },

      () => {
        storage
          .ref("Media")
          .child(mediaFile.name) 
          .getDownloadURL()
          .then((url) => {
            handleSendUserMessage(event, url);
          })
          .catch((error) => {
            console.log(error);
          });
        handleFileUploadModal();
      }
    );
  }

  function handleUserMessage(event) {
    setUserMessage(event.target.value);
  }

  const mediaFileUrlForDisplay = URL.createObjectURL(mediaFile);

  return (
    <div className="file__uploadModal">
      <Dialog
        open={handleFileUploadModal}
        onClose={handleFileUploadModal}
        PaperProps={{
          style: {
            backgroundColor: "rgba(43, 72, 158, 1)",
            boxShadow: "none",
            color: "white",
          },
        }}
      >
        <div className={classes.image__toBeUploadedContainer}>
          {mediaFile.type.match("image.*") ? (
            <img
              className={classes.image__toBeUploaded}
              src={mediaFileUrlForDisplay}
              alt="Image__toBeUploaded"
            />
          ) : (
            <video
              src={mediaFileUrlForDisplay}
              controls
              width="310"
              height="240"
            />
          )}
        </div>
        <DialogContent>
          <form
            autoComplete="off"
            autoFocus="true"
            onSubmit={handleUploadToStorageAndGetFileUrl}
          >
            <TextField
              id="outlined-basic"
              label="Enter your message"
              fullWidth
              margin="normal"
              className={classes.image__messageInput}
              onChange={handleUserMessage}
              variant="outlined"
            ></TextField>
          </form>

          <div style={progressBar}>
            <Box display="flex" justifyContent="center" position="relative">
              <CircularProgress variant="determinate" value={progress} />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="caption" component="div" color="white">
                  {progress}%
                </Typography>
              </Box>
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFileUploadModal} style={{ color: "white" }}>
            Cancel
          </Button>
          <Button
            onClick={handleUploadToStorageAndGetFileUrl}
            variant="contained"
            color="primary"
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FileUploadModal;
