import { useAddUsers, useEditUsers } from "@/hooks/user";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
export type DefaultValue = Form & { id: string };
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: "EDIT" | "ADD";
  defaultValues?: DefaultValue;
};
type Form = {
  email: string;
  username: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  number: number;
  zipCode: string;
  long: string;
  lat: string;
};
export const FormModal = ({ open, setOpen: setOpen }: Props) => {
  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        className="flex items-center"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bg-white w-1/2 mx-auto rounded-lg p-5">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Detail User
          </Typography>
          <p>Username</p>
        </Box>
      </Modal>
    </>
  );
};
