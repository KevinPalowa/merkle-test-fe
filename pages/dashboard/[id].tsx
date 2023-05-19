import { formatAddress } from "@/helper/formatAddress";
import { useGetUser } from "@/hooks/user";
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
    <div className="shadow rounded-lg w-1/2 mx-auto">
      <ul>
        <span>Name: </span>
        <span>
          {data.name.firstname} {data.name.lastname}
        </span>
      </ul>
      <ul>
        <span>Email: </span>
        <span>{data.email}</span>
      </ul>
      <ul>
        <span>Phone: </span>
        <span>{data.phone}</span>
      </ul>
      <ul>
        <span>Address: </span>
        <span>{formatAddress(data.address)}</span>
      </ul>
    </div>
  );
}
