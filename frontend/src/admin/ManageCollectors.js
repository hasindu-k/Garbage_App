import React from "react";
import AdminNav from "./AdminNav";

function ManageCollectors() {
 

  return (
    <div className="flex">
      <AdminNav />
      <div className="flex-grow p-6">
        <h1>Manage Collectors</h1>
      </div>
    </div>
  );
}

export default ManageCollectors;
