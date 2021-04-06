import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Confirmdialog = ({ title, open, setOpen, onConfirm }) => {
  const handleClose = () => {
    setOpen(false);
  };
  if (!open) {
    return null;
  }
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You cannot undo this action.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variation="contained">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmdialog;
