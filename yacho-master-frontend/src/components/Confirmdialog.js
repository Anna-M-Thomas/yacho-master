import React from "react";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Confirmdialog = ({ title, open, setOpen, onConfirm }) => {
  const { t } = useTranslation();

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
          {t("confirm.cantundo")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variation="contained">
          {t("confirm.cancel")}
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          {t("confirm.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmdialog;
