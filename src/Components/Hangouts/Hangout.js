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
import { IoIosPeople } from "react-icons/io";
import CreateHangoutDialog from "../CreateHangoutDialog/CreateHangoutDialog";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  forumIcon: {
    color: "white",
  },
  hangoutList: {
    boxShadow:
      "0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05)",
  },

  iconStyling: {
    color: "white",
  },
}));

function Hangout() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const [hangouts, setHangouts] = useState([]);
  const [showCreateHangoutDialog, setCreateHangoutDialogue] = useState(false);
  const [showSnackbar, setSnackbar] = useState(false);

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
  }, []);

  function addNewHangout(hangoutName, hangoutPicture) {
    const uploadTask = storage
      .ref(`HangoutProfilePicture/${hangoutPicture.name}`)
      .put(hangoutPicture);

    if (hangoutName && hangoutPicture) {
      hangoutName = hangoutName.charAt(0).toUpperCase() + hangoutName.slice(1);
      for (let i = 0; i < hangouts.length; i++) {
        if (hangoutName === hangouts[i].hangoutName) {
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
          boxShadow:
            "0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05)",
        }}
      >
        <ListItemText primary="Create New Hangout" />
        <IconButton
          onClick={handleShowCreateHangoutDialog}
          className={classes.forumIcon}
        >
          <AddIcon />
        </IconButton>
      </ListItem>

      <List className={classes.hangoutList}>
        <ListItem button onClick={handleHangoutCollapseAndExpand}>
          <ListItemIcon className={classes.forumIcon}>
            <IoMdChatboxes size={25}/>
          </ListItemIcon>
          <ListItemText
            primary="HANGOUTS"
            style={{
              color: "darkgrey",
            }}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={open} timeout="auto">
          <List disablePadding className={classes.hangout__childList}>
            {hangouts.map((hangout) => (
              <ListItem
                button
                onClick={() => handleHangoutRoute(hangout.id)}
                key={hangout.id}
                className={classes.hangoutNestedList}
              >
                <ListItemIcon className={classes.iconStyling}>
                  <IoIosPeople size={25}/>
                </ListItemIcon>
                <ListItemText primary={hangout.hangoutName} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
}

export default Hangout;
