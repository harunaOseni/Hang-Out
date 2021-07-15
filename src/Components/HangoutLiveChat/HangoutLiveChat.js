import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//import Text component goes in here
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
import { MdKeyboardVoice } from "react-icons/md";
import "emoji-mart/css/emoji-mart.css";
import userEvent from "@testing-library/user-event";
//import file upload dialogue here

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
}));

function HangoutLiveChat(props) {
  const classes = useStyles();
  const [hangoutName, setHangoutName] = useState("");
  const parameter = useParams();
  const [mediaFile, setMediaFile] = useState(null);
  const [userMessages, setUserMessages] = useState("");
  const [emojiState, setEmojiState] = useState(false);

  useEffect(() => {
    if (parameter.id) {
      database
        .collection("hangouts")
        .doc(parameter.id)
        .onSnapshot((snapshot) => {
          setHangoutName(snapshot.data().hangoutName);
        });
    }
  }, [parameter]);

  function handleMediaFile(event) {
    event.preventDefault();
    if (event.target.files[0]) {
      setMediaFile(event.target.files[0]);
    }
  }

  function handleAddEmojiToMsg(event) {
    setUserMessages(userMessages + event.native);
  }

  function handleUserMessage(event) {
    event.preventDefault();
    const message = event.target.value;
    setUserMessages(message);
  }

  function handleEmojiState(event) {
    event.preventDefault();
    setEmojiState(!emojiState);
  }

  return (
    <div className={classes.hangout__liveChat}>
      <Grid item xs={12} className={classes.hangout__nameContainer}>
        <IoIosPeople className={classes.iconStyling} size={25} />
        <Typography variant="h3" className={classes.hangout__nameText}>
          {hangoutName} Hangout
        </Typography>
      </Grid>
      <div
        style={{
          height: "calc(100vh - 200px)",
        }}
      />
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

          <form autoComplete="off" className={classes.form__input}>
            <TextField
              id="outline-basic"
              variant="outlined"
              multiline
              fullWidth
              rows={1}
              rowsMax={3}
              value={userMessages}
              onChange={handleUserMessage}
              className={classes.form__inputTextField}
            />

            {/* A Controlled Component is one that takes its current value 
            through props and notifies changes through callbacks like onChange. */}
          
            <IconButton>
              <MdKeyboardVoice />
            </IconButton>
            <IconButton>
              <IoMdSend />
            </IconButton>
          </form>
        </Grid>
      </div>
    </div>
  );
}

export default HangoutLiveChat;
