import { formatAddress } from "@/helper/formatAddress";
import { useGetUser } from "@/hooks/user";
import { Card, CardContent, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function DetailUser() {
  const { query } = useRouter();
  const { id } = query;
  const { data, isLoading, isError } = useGetUser(
    typeof id === "string" ? id : ""
  );
  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Error...";
  }
  return (
    <div className="container mx-auto drop-shadow-md">
      <Head>
        <title>
          {data.name.firstname} {data.name.lastname}
        </title>
      </Head>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h2">
            User Details
          </Typography>
          <Typography variant="body2" component="p">
            <strong>Name:</strong> {data.name.firstname} {data.name.lastname}
          </Typography>
          <Typography variant="body2" component="p">
            <strong>Email:</strong> {data.email}
          </Typography>
          <Typography variant="body2" component="p">
            <strong>Phone:</strong> {data.phone}
          </Typography>
          <Typography variant="body2" component="p">
            <strong>Address:</strong> {formatAddress(data.address)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
