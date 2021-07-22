import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

function DeleteMessageDialog({
  hangoutMessageId,
  handleDeleteModal,
  handleDeleteMessage,
}) {
  return (
    <div>
      <Dialog
        open={handleDeleteModal}
        onClose={handleDeleteModal}
        PaperProps={{
          style: {
            backgroundColor: "rgba(43, 72, 158, 1)",
            boxShadow: "none",
            color: "whiteSmoke",
          },
        }}
      >
        <DialogTitle>Are you sure you want to delete this message?</DialogTitle>

        <DialogActions>
          <Button
            onClick={handleDeleteModal}
            variant="outlined"
            style={{ color: "white" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteMessage(hangoutMessageId);
            }}
            color="primary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteMessageDialog;
