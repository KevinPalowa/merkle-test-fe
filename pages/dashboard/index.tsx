import { formatAddress } from "@/helper/formatAddress";
import { useDeleteUsers, useGetUsers } from "@/hooks/user";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { DefaultValue, FormModal } from "@/components/FormModal";
import { Button, Snackbar, Alert } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { useLogin } from "@/hooks/login";
export default function Dashboard() {
  const { data, isLoading } = useGetUsers();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const { logout } = useLogin();
  const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [valuesToEdit, setValuesToEdit] = useState<DefaultValue | undefined>();
  const { mutate, isLoading: isLoadingDelete } = useDeleteUsers();
  const [showToast, setShowToast] = useState(false);
  const columns: TableColumn<UserResponse>[] = [
    {
      name: "Name",
      selector: (row) => `${row.name.firstname} ${row.name.lastname}`,
    },

    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },

    {
      name: "Address",
      selector: (row) => formatAddress(row.address),
    },

    {
      name: "Action",
      button: true,
      cell: (row) => (
        <div className="space-x-1">
          <Link href={`dashboard/${row.id}`}>
            <RemoveRedEyeIcon className="text-xl" />
          </Link>
          <button
            onClick={() => {
              setValuesToEdit({
                id: row.id.toString(),
                email: row.email,
                username: row.username,
                password: row.password,
                phone: row.phone,
                firstName: row.name.firstname,
                lastName: row.name.lastname,
                city: row.address.city,
                street: row.address.street,
                number: row.address.number,
                zipCode: row.address.zipcode,
                long: row.address.geolocation.long,
                lat: row.address.geolocation.lat,
              });
              setShowModalEdit(true);
            }}
          >
            <CreateIcon className="text-xl" />
          </button>
          <button
            onClick={() => {
              setShowConfirmationDelete(true);
              setIdToDelete(row.id.toString());
            }}
          >
            <DeleteIcon className="text-xl text-red-600" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <Head>
        <title>Dashboad</title>
      </Head>
      <Snackbar
        open={showToast}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setShowToast(false)}
      >
        <Alert
          onClose={() => setShowToast(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Success Delete user!
        </Alert>
      </Snackbar>
      <div className="container mx-auto mt-5 drop-shadow-md">
        <div className="flex justify-between mb-5">
          <h1 className="text-2xl font-bold">User List</h1>
          <div className="space-x-2">
            <Button
              color="primary"
              onClick={() => {
                setShowModalAdd(true);
              }}
              variant="outlined"
            >
              +Add User
            </Button>
            <Button
              color="error"
              onClick={() => {
                setShowLogoutConfirmation(true);
              }}
              variant="outlined"
            >
              Logout
            </Button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data!}
          pagination
          progressPending={isLoading}
        />
      </div>
      <FormModal open={showModalAdd} setOpen={setShowModalAdd} type="ADD" />
      <FormModal
        open={showModalEdit}
        setOpen={setShowModalEdit}
        type="EDIT"
        defaultValues={valuesToEdit}
      />
      <DeleteConfirmationModal
        open={showConfirmationDelete}
        onClose={() => {
          setShowConfirmationDelete(false);
        }}
        isLoading={isLoadingDelete}
        title="Delete Confirmation"
        message="Are you sure you want to delete this user?"
        onConfirm={() => {
          mutate(idToDelete, {
            onSuccess: () => {
              setShowToast(true);
              setShowConfirmationDelete(false);
            },
          });
        }}
      />

      <DeleteConfirmationModal
        open={showLogoutConfirmation}
        onClose={() => {
          setShowLogoutConfirmation(false);
        }}
        title="Logout"
        message="Are you sure you want to logout?"
        onConfirm={() => {
          logout();
        }}
      />
    </>
  );
}
