import React, { useState } from "react";
import { message, Table } from "antd";

export const Users = () => {
  const [users, setUsers] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  return (
    <div>
      <Table columns={columns}  />
    </div>
  );
};
