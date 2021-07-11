import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import { database, storage } from "../../Firebase/firebase";
import { SnackbarContent } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { IoMdChatboxes } from "react-icons/io";
import { BiHash } from "react-icons/io";
import CreateHangoutDialog from "../CreateHangoutDialog/CreateHangoutDialog";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

function Hangout() {
  //   const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const [hangouts, setHangouts] = useState([]);
  const [showCreateHangoutDialog, setCreateHangoutDialogue] = useState(false);
  const [showSnackbar, setSnackbar] = useState(false);
  const [hangoutProfilePictureUrl, setHangoutProfilePictureUrl] =
    useState(null);

  //A Bunch of functions to handle the various states of the component

  useEffect(() => {
    database
      .collection("hangouts")
      .orderBy("hangoutName", "asc")
      .onSnapshot((snapshot) => {
        setHangouts(
          snapshot.docs.map((hangout) => ({
            hangoutName: hangout.data().hangoutName,
            id: hangout.id,
            hangoutPicture: hangout.data().hangoutPicture,
          }))
        );
      });
  });

  function addNewHangout(hangoutName, hangoutPicture) {
    const uploadTask = storage
      .ref(`HangoutProfilePicture/${hangoutPicture.name}`)
      .put(hangoutPicture);

    if (hangoutName || hangoutPicture) {
      hangoutName = hangoutName.charAt(0).toUpperCase() + hangoutName.slice(1);
      for (let i = 0; i < hangouts.length; i++) {
        if (hangouts[i].hangoutName === hangoutName) {
          handleHangoutSnackBar();
          return;
        }
      }
      uploadTask.on(
        (error) => {
          if (error) {
            console.log(error);
          }
        },
        () => {
          storage
            .ref("HangoutProfilePicture")
            .child(hangoutPicture.name)
            .getDownloadURL()
            .then((url) => {
              database
                .collection("hangouts")
                .add({
                  hangoutName:
                    hangoutName.charAt(0).toUpperCase() + hangoutName.slice(1),
                  hangoutPicture: url,
                })
                .catch((error) => {
                  console.log(`Here's what went wrong, ${error}`);
                });
            });
        }
      );
    }
  }

  function handleHangoutCollapseAndExpand() {
    setOpen(!open);
  }

  function handleShowCreateHangoutDialog() {
    setCreateHangoutDialogue(!showCreateHangoutDialog);
  }

  function handleHangoutRoute(id) {
    history.push(`/hangout/${id}`);
  }

  function handleHangoutSnackBar() {
    setSnackbar(!showSnackbar);
  }

  return (
    <div className="hangout">
      <Snackbar
        open={showSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        TransitionComponent={Fade}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#191751",
          }}
          action={
            <IconButton color="inherit" onClick={handleHangoutSnackBar}>
              <CloseIcon />
            </IconButton>
          }
          message="Hangout Already Exist!"
        />
      </Snackbar>
      {showCreateHangoutDialog ? (
        <CreateHangoutDialog
          CreateAHangout={addNewHangout}
          showDialog={handleShowCreateHangoutDialog}
        />
      ) : null}

      <ListItem
        style={{
          paddingTop: "0px",
          paddingBottom: "0px",
        }}
      >
        <ListItemText primary="Create New Hangout" />
        <IconButton onClick={handleShowCreateHangoutDialog}>
          <AddIcon />
        </IconButton>
      </ListItem>
    </div>
  );
}

export default Hangout;
