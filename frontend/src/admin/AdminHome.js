import React from "react";
import AdminNav from "./AdminNav";

function AdminHome() {
  return (
    <div>
      <div className="flex">
        <AdminNav />
        <div><h1>Admin Home</h1></div>
      </div>
    </div>
  );
}

export default AdminHome;
