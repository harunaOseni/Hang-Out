import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { database } from "../../Firebase/firebase";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  }

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
 }))

function EditProfileDialog({ handleEditProfileToggle, handleSnackbarToggle }) {
  const [open, setOpen] = useState(true);
  const [originalName, setOriginalName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userDetails"));
    setDisplayName(userInfo.displayName);
    setOriginalName(userInfo.name);
    setEmail(userInfo.email);
    setUserId(userInfo.uid);
    setProfilePicture(userInfo.photoUrl);
  }, []);

  function handleCloseDialogue() {
    setOpen(false);
    handleEditProfileToggle();
  }

  function updateProfileDisplayName(event) {
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
            <div>
              <Avatar  />
            </div>
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
            onClick={updateProfileDisplayName}
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
