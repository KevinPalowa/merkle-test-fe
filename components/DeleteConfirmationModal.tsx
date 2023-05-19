import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
  buttonMessage?: string;
};
const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  isLoading,
  buttonMessage,
}: Props): JSX.Element => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            setIsConfirmed(true);
            onConfirm();
          }}
          variant="outlined"
          color="error"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : buttonMessage ? buttonMessage : "Yes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
