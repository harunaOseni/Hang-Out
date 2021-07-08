import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { database } from "../../Firebase/firebase";

function EditProfileDialog({ handleEditProfileToggle, handleSnackbarToggle }) {
  const [open, setOpen] = useState(true);
  const [originalName, setOriginalName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

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
      .then((result) => {
        handleSnackbarToggle();
      })
      .catch((error) => {
        console.log(error);
      });

    setOpen(false);
    handleEditProfileToggle();
  }

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    setDisplayName(userDetails.displayName);
    setOriginalName(userDetails.name);
    setEmail(userDetails.email);
    setUserId(userDetails.id);
    setProfilePicture(userDetails.photoUrl);
  }, []);

  return (
    <div>
      <Dialog open={open} onClose={handleCloseDialogue}>
        <DialogTitle>Edit {`${originalName}'s`} Profile</DialogTitle>
        <DialogContent>
          This is the dialog content!
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditProfileDialog;
