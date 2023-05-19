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
import React, { useEffect, useState } from "react";
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
export const FormModal = ({
  open,
  setOpen: setOpen,
  type,
  defaultValues,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Form>();
  const [showToast, setShowToast] = useState(false);
  const { mutate, isLoading } = useAddUsers();
  const { mutate: doEdit, isLoading: isLoadingEdit } = useEditUsers();
  const onSubmit = (e: Form) => {
    let payload: UserResponse = {
      id: 0,
      email: e.email,
      username: e.username,
      password: e.password,
      name: {
        firstname: e.firstName,
        lastname: e.lastName,
      },
      address: {
        city: e.city,
        street: e.street,
        number: e.number,
        zipcode: e.zipCode,
        geolocation: {
          lat: e.lat,
          long: e.long,
        },
      },
      phone: e.phone,
    };
    if (type === "ADD") {
      mutate(payload, {
        onSuccess: () => {
          setOpen(false);
          setShowToast(true);
        },
      });
    } else {
      if (defaultValues) {
        payload.id = Number(defaultValues.id);
      }
      doEdit(payload, {
        onSuccess: () => {
          setOpen(false);
          setShowToast(true);
        },
      });
    }
  };
  useEffect(() => {
    if (defaultValues) {
      setValue("email", defaultValues.email);
      setValue("firstName", defaultValues.firstName);
      setValue("username", defaultValues.username);
      setValue("lastName", defaultValues.lastName);
      setValue("password", defaultValues.password);
      setValue("phone", defaultValues.phone);
      setValue("city", defaultValues.city);
      setValue("street", defaultValues.street);
      setValue("number", defaultValues.number);
      setValue("zipCode", defaultValues.zipCode);
      setValue("long", defaultValues.long);
      setValue("lat", defaultValues.lat);
    }
  }, [defaultValues, setValue]);
  return (
    <>
      <Snackbar
        open={showToast}
        autoHideDuration={6000}
        onClose={() => setShowToast(false)}
      >
        <Alert
          onClose={() => setShowToast(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Sucess {type === "ADD" ? "Create" : "Edit"} User!
        </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center"
      >
        <Box className="bg-white w-1/2 mx-auto rounded-lg p-5">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {type === "ADD" ? "Add User" : "Edit User"}
          </Typography>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-3">
              <TextField
                id="outlined-basic"
                label="Email Address"
                error={!!errors.email}
                variant="outlined"
                {...register("email", { required: "Email is Required" })}
              />

              <TextField
                id="outlined-basic"
                label="Username"
                error={!!errors.username}
                variant="outlined"
                {...register("username", { required: "Username is Required" })}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                error={!!errors.password}
                variant="outlined"
                type="password"
                {...register("password", { required: "Password is Required" })}
              />
              <TextField
                id="outlined-basic"
                label="Phone"
                error={!!errors.phone}
                variant="outlined"
                type="tel"
                {...register("password", { required: "Phone is Required" })}
              />
              <div className="flex space-x-3">
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  type="text"
                  error={!!errors.firstName}
                  className="flex-grow"
                  {...register("firstName", {
                    required: "First name is Required",
                  })}
                />

                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  error={!!errors.lastName}
                  variant="outlined"
                  type="text"
                  className="flex-grow"
                  {...register("lastName", {
                    required: "Last name is Required",
                  })}
                />
              </div>
              <div className="flex space-x-3">
                <TextField
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                  type="text"
                  error={!!errors.city}
                  className="flex-grow"
                  {...register("city", { required: "City is Required" })}
                />

                <TextField
                  id="outlined-basic"
                  label="Street"
                  variant="outlined"
                  type="text"
                  error={!!errors.street}
                  className="flex-grow"
                  {...register("street", { required: "Street is Required" })}
                />
                <TextField
                  id="outlined-basic"
                  label="Number"
                  variant="outlined"
                  type="text"
                  className="flex-grow"
                  error={!!errors.number}
                  {...register("number", { required: "Number is Required" })}
                />
              </div>
              <div className="flex space-x-3">
                <TextField
                  id="outlined-basic"
                  label="Zip Code"
                  variant="outlined"
                  type="text"
                  className="flex-grow"
                  error={!!errors.zipCode}
                  {...register("zipCode", { required: "Zip code is Required" })}
                />
                <TextField
                  id="outlined-basic"
                  label="Long"
                  variant="outlined"
                  error={!!errors.long}
                  type="text"
                  className="flex-grow"
                  {...register("long", { required: "Long is Required" })}
                />

                <TextField
                  id="outlined-basic"
                  label="Lat"
                  error={!!errors.lat}
                  variant="outlined"
                  type="text"
                  className="flex-grow"
                  {...register("lat", { required: "lat is Required" })}
                />
              </div>
            </div>
            <Box className="flex justify-end mt-5 space-x-5">
              <Button
                onClick={() => {
                  setOpen(false);
                }}
                variant="outlined"
                color="error"
              >
                Cancel
              </Button>
              <Button
                disabled={isLoadingEdit || isLoading}
                type="submit"
                variant="contained"
              >
                {type === "ADD" ? "Add" : "Edit"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};
