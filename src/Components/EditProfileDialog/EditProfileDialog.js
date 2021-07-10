import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { database, storage } from "../../Firebase/firebase";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Fab, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DoneAllIcon from "@material-ui/icons/DoneAll";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  textField: {
    justifyContent: "center",
    margin: theme.spacing(1),
    display: "none",
  },

  uploadProfilePicture: {
    margin: theme.spacing(1),
    color: "white",
    backgroundColor: "rgba(43,72,158,0.3)",
    "&:hover": {
      backgroundColor: "whiteSmoke",
      color: "rgba(43,72,158,0.946)",
    },
    marginTop: theme.spacing(3),
  },

  profileUpload: {
    display: "flex",
    flexDirection: "column",
  },

  doneIcon: {
    marginLeft: theme.spacing(2),
    color: "lightgreen",
  },
  profilePic__info: {
    display: "flex",
  },
}));

function EditProfileDialog({ handleEditProfileToggle, handleSnackbarToggle }) {
  const [open, setOpen] = useState(true);
  const [originalName, setOriginalName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userDetails"));
    setDisplayName(userInfo.displayName);
    setOriginalName(userInfo.name);
    setEmail(userInfo.email);
    setUserId(userInfo.uid);
    setProfilePicture(userInfo.photoUrl);
  }, []);

  function handleProfilePicture(event) {
    setProfilePictureFile(event.target.files[0]);
  }

  function handleCloseDialogue() {
    setOpen(false);
    handleEditProfileToggle();
  }

  function updateUserProfile(event) {
    event.preventDefault();
    database
      .collection("users")
      .doc(userId)
      .update({
        displayName: displayName,
      })
      .catch((error) => {
        console.log(error);
      });

    if (profilePictureFile !== null) {
      const uploadTask = storage
        .ref(`profilePictures/${profilePictureFile.name}`)
        .put(profilePictureFile);
      uploadTask.on(
        (error) => {
          if (error) {
            console.log(error);
          }
        },
        () => {
          storage
            .ref("profilePictures")
            .child(profilePictureFile.name)
            .getDownloadURL()
            .then((url) => {
              database
                .collection("users")
                .doc(userId)
                .update({
                  photoUrl: url,
                })
                .catch((error) => {
                  console.log(error);
                });
            });
        }
      );
      setProfilePictureFile(null);
    }
    handleSnackbarToggle();
    setOpen(false);
    handleEditProfileToggle();
  }

  function handleDisplayName(event) {
    setDisplayName(event.target.value);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseDialogue}
        PaperProps={{
          style: {
            backgroundColor: "rgba(43, 72, 158, 1)",
            boxShadow: "none",
            color: "whiteSmoke",
          },
        }}
      >
        <DialogTitle>Edit {`${originalName}'s`} Profile</DialogTitle>
        <DialogContent>
          <form autoComplete="off">
            <div className={classes.root}>
              <Avatar
                src={profilePicture}
                alt={originalName}
                className={classes.large}
              />
              <label
                htmlFor="profilePicture__upload"
                className={classes.profileUpload}
              >
                <TextField
                  name="profile picture upload"
                  type="file"
                  className={classes.textField}
                  id="profilePicture__upload"
                  onChange={handleProfilePicture}
                />
                <Fab
                  size="small"
                  component="span"
                  aria-label="add"
                  variant="extended"
                  className={classes.uploadProfilePicture}
                >
                  <AddIcon /> Change photo
                </Fab>
                {profilePictureFile !== null ? (
                  <div className={classes.profilePic__info}>
                    <DoneAllIcon className={classes.doneIcon} />
                    <h4>Click the confirm button to complete change!</h4>
                  </div>
                ) : null}
              </label>
            </div>

            <TextField
              id="outlined-basic"
              label="Name"
              fullWidth
              margin="normal"
              variant="outlined"
              disabled
              value={originalName}
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
                color: "black",
              }}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              disabled
              value={email}
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
                color: "black",
              }}
            />

            <TextField
              id="outlined-basic"
              label="Display Name"
              value={displayName}
              onChange={handleDisplayName}
              fullWidth
              margin="normal"
              variant="outlined"
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
                color: "black",
              }}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialogue} style={{ color: "white" }}>
            Cancel
          </Button>
          <Button
            onClick={updateUserProfile}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditProfileDialog;
