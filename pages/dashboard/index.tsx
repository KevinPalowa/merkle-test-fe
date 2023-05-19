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
export default function Dashboard() {
  const { data, isLoading } = useGetUsers();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
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
        <div>
          <Link href={`dashboard/${row.id}`}>
            <RemoveRedEyeIcon />
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
            <CreateIcon />
          </button>
          <button
            onClick={() => {
              setShowConfirmationDelete(true);
              setIdToDelete(row.id.toString());
            }}
          >
            <DeleteIcon />
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
      <div>
        <div className="flex justify-between">
          <h1>User List</h1>
          <Button
            color="secondary"
            onClick={() => {
              setShowModalAdd(true);
            }}
          >
            +Add User
          </Button>
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
    </>
  );
}
