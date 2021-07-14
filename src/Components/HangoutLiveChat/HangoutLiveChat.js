import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//import Text compoenent goes in here
import IconButton from "@material-ui/core/IconButton";
import { useParams } from "react-router-dom";
import { database } from "../../Firebase/firebase";
import firebase from "firebase";
import ScrollableFeed from "react-scrollable-feed";
import { IoIosPeople } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import { GrEmoji } from "react-icons/io";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
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
    alignItems: "center",
    fontSize: "1.5em",
    fontWeight: "bold",
    color: "#fff9",
  },

  iconStyling: {
    marginRight: "5px",
    color: "#fff9",
  },
}));

function HangoutLiveChat(props) {
  const classes = useStyles();
  const [hangoutName, setHangoutName] = useState("");
  const parameter = useParams();

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

  return (
    <div className={classes.hangout__liveChat}>
      <Grid item xs={12} className={classes.hangout__nameContainer}>
        <IoIosPeople className={classes.iconStyling} size={25} />
        <Typography variant="h3" className={classes.hangout__nameText}>
          {hangoutName} Hangout
        </Typography>
      </Grid>

      <div className={classes.textActionField}>
        <Grid item xs={12} className={classes.textActionContent}>
          
        </Grid>
      </div>
    </div>
  );
}

export default HangoutLiveChat;
