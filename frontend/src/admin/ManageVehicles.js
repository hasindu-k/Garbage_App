import React from "react";
import AdminNav from "./AdminNav";

function ManageVehicles() {
 

  return (
    <div className="flex">
      <AdminNav />
      <div className="flex-grow p-6">
        <h1>Manage Vehicles</h1>
      </div>
    </div>
  );
}

export default ManageVehicles;
