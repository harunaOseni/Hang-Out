import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  confirmText: {
    display: "flex",
    marginTop: "1rem",
  },
  fileField: {
    display: "none",
  },
  textField: {
    backgroundColor: "white",
    outlineWidth: "0",
  },
  uploadHangoutPicture: {
    color: "white",
    backgroundColor: "rgba(43,72,158,0.3)",
    "&:hover": {
      backgroundColor: "whiteSmoke",
      color: "rgba(43,72,158,0.946)",
    },
  },
}));

function CreateHangoutDialog({
  CreateAHangout,
  showDialog,
  progress,
  progressBar,
  setProgressBar,
  setProgress,
}) {
  const [hangoutName, setHangoutName] = useState(null);
  const [hangoutPictureFile, setHangoutPictureFile] = useState(null);
  const classes = useStyles();

  function handleHangoutName(event) {
    setHangoutName(event.target.value);
  }

  function handleHangoutPictureFile(event) {
    setHangoutPictureFile(event.target.files[0]);
  }

  function handleCreateHangout(event) {
    event.preventDefault();
    if (hangoutName && hangoutPictureFile) {
      CreateAHangout(hangoutName, hangoutPictureFile);
      if (progress !== 100) {
        setProgressBar({ display: "block" });
      } else {
        setProgressBar({ display: "none" });
        setProgress(0);
        showDialog();
      }
    }
    // setProgressBar({ display: "none" });
    // setProgress(0);
    // showDialog();
  }
  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={showDialog}
        PaperProps={{
          style: {
            backgroundColor: "rgba(43, 72, 158, 1)",
            boxShadow: "none",
            color: "whiteSmoke",
          },
        }}
      >
        <DialogTitle>Create a Hangout</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleCreateHangout}
            className={classes.root}
            autoComplete="off"
          >
            <label htmlFor="hangoutGroupPicture">
              <TextField
                name="Hangout Group Photo Upload"
                type="file"
                className={classes.fileField}
                id="hangoutGroupPicture"
                onChange={handleHangoutPictureFile}
              />
              <Fab
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
                className={classes.uploadHangoutPicture}
              >
                <AddIcon /> Choose Hangout Photo
              </Fab>
              {hangoutPictureFile !== null ? (
                <div className={classes.confirmText}>
                  <DoneAllIcon className={classes.doneIcon} />
                  <h4 style={{ paddingTop: "3px", paddingLeft: "3px" }}>
                    Hangout Photo Selected
                  </h4>
                </div>
              ) : null}
            </label>
            <TextField
              id="outlined-basic"
              label="Enter Hangout Name"
              fullWidth
              value={hangoutName}
              margin="normal"
              onChange={handleHangoutName}
              variant="outlined"
              required
              className={classes.textField}
            />
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
          <Button onClick={showDialog} style={{ color: "white" }}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateHangout}
            color="primary"
            variant="contained"
            autoFocus
            type="submit"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateHangoutDialog;
