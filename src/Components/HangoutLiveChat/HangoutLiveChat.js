import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Message } from "../../Components";
import IconButton from "@material-ui/core/IconButton";
import { useParams } from "react-router-dom";
import { database } from "../../Firebase/firebase";
import firebase from "firebase";
import ScrollableFeed from "react-scrollable-feed";
import { IoIosPeople } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import { GrEmoji } from "react-icons/gr";
import { FcAddImage } from "react-icons/fc";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import FileUploadModal from "../FileUploadModal/FileUploadModal";

const useStyles = makeStyles((theme) => ({
  hangout__liveChat: {
    flexGrow: 1,
  },

  hangout__nameContainer: {
    display: "flex",
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(0.25),
  },

  hangout__nameText: {
    alignItems: "flex-end",
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "#fff9",
    paddingTop: theme.spacing(0.5),
  },

  iconStyling: {
    marginRight: "5px",
    color: "#fff9",
  },

  textActionContent: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    borderRadius: "5px",
    backgroundColor: "#fff4",
  },

  textActionField: {
    paddingTop: "15px",
    paddingLeft: "15px",
    paddingRight: "15px",
  },

  form__input: {
    display: "flex",
    width: "100%",
  },

  form__inputTextField: {
    width: "100%",
  },

  message__feed: {
    position: "relative",
    height: "calc(100vh - 200px)",
    paddingLeft: "10px",
    paddingBottom: "5px",
    paddingTop: "5px",
    paddingRight: "10px",
  },
}));

function HangoutLiveChat() {
  const classes = useStyles();
  const [hangoutName, setHangoutName] = useState("");
  const parameter = useParams();
  const [mediaFile, setMediaFile] = useState(null);
  const [userMessage, setUserMessage] = useState("");
  const [emojiState, setEmojiState] = useState(false);
  const [hangoutMessages, setHangoutMessages] = useState([]);
  const [fileUploadModalState, setFileUploadModalState] = useState(false);

  useEffect(() => {
    if (parameter.id) {
      database
        .collection("hangouts")
        .doc(parameter.id)
        .onSnapshot((snapshot) => {
          setHangoutName(snapshot.data().hangoutName);
        });

      database
        .collection("hangouts")
        .doc(parameter.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setHangoutMessages(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                data: doc.data(),
              };
            })
          );
        });
    }

    setUserMessage("");
    setEmojiState(false);
  }, [parameter]);

  function handleFileUploadModal() {
    setFileUploadModalState(!fileUploadModalState);
  }

  function handleMediaFile(event) {
    event.preventDefault();
    if (event.target.files[0]) {
      setMediaFile(event.target.files[0]);
      handleFileUploadModal();
    }
  }

  function handleAddEmojiToMsg(event) {
    setUserMessage(userMessage + event.native);
  }

  function handleUserMessage(event) {
    event.preventDefault();
    const message = event.target.value;
    setUserMessage(message);
    setEmojiState(false);
  }

  function handleSendUserMessage(event) {
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
        const messageMedia = null;
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
      setEmojiState(false);
    }
  }

  function handleEmojiState(event) {
    event.preventDefault();
    setEmojiState(!emojiState);
  }

  return (
    <div className={classes.hangout__liveChat}>
      {fileUploadModalState ? (
        <FileUploadModal
          handleFileUploadModal={handleFileUploadModal}
          mediaFile={mediaFile}
        />
      ) : null}
      <Grid item xs={12} className={classes.hangout__nameContainer}>
        <IoIosPeople className={classes.iconStyling} size={25} />
        <Typography variant="h3" className={classes.hangout__nameText}>
          {hangoutName} Hangout
        </Typography>
      </Grid>

      <div className={classes.message__feed}>
        <ScrollableFeed>
          {hangoutMessages.map((message) => {
            return (
              <Message
                key={message.id}
                hangoutMessageId={message.id}
                messageData={message.data}
              />
            );
          })}
        </ScrollableFeed>
      </div>
      <div className={classes.textActionField}>
        <Grid item xs={12} className={classes.textActionContent}>
          <input
            type="file"
            accept="audio/*,video/*,image/*"
            style={{
              display: "none",
            }}
            onChange={handleMediaFile}
            id="file__input"
          />

          <IconButton component="label" htmlFor="file__input">
            <FcAddImage />
          </IconButton>

          {emojiState ? (
            <Picker
              onSelect={handleAddEmojiToMsg}
              style={{ position: "absolute", bottom: "60px" }}
              theme="light"
            />
          ) : null}

          <IconButton component="button" onClick={handleEmojiState}>
            <GrEmoji className={classes.iconStyling} size={25} />
          </IconButton>

          <form
            autoComplete="off"
            className={classes.form__input}
            onSubmit={handleUserMessage}
          >
            <TextField
              id="outline-basic"
              variant="outlined"
              multiline
              fullWidth
              rows={1}
              rowsMax={3}
              value={userMessage}
              onChange={handleUserMessage}
              className={classes.form__inputTextField}
            />
            <IconButton type="submit" onClick={handleSendUserMessage}>
              <IoMdSend size={30} />
            </IconButton>
          </form>
        </Grid>
      </div>
    </div>
  );
}

export default HangoutLiveChat;
