// import React from "react";
// import AdminNav from "./AdminNav";

// function ManageVehicles() {
 

//   return (
//     <div className="flex">
//       <AdminNav />
//       <div className="flex-grow p-6">
//         <h1>Manage Vehicles</h1>
//       </div>
//     </div>
//   );
// }

// export default ManageVehicles;
import React, { useState } from 'react';
import axios from 'axios'; // For making API requests (assuming a backend API)

const AddVehicleForm = () => {
  const [formData, setFormData] = useState({
    truckNo: '',
    name: '',
    area: '',
    owner: '',
    year: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8070/vehicle/addVehicle', formData); // Replace with your actual API endpoint
      console.log(response.data); // Handle success response (optional)
      alert('Vehicle added successfully!');
      setFormData({
        truckNo: '',
        name: '',
        area: '',
        owner: '',
        year: '',
      });
    } catch (error) {
      console.error('Error adding vehicle:', error);
      alert('Error adding vehicle. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-center mb-4">Add Vehicle</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Grid container */}
        <div>
          <label className="block mb-2 font-semibold">Truck Number:</label>
          <input
            name="truckNo"
            value={formData.truckNo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Vehicle Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Area:</label>
          <input
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Owner Name:</label>
          <input
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Year:</label>
          <input
            name="year"
            type="number" // Specify input type as number
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full p-2 mt-4 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition"
      >
        Add Vehicle
      </button>
    </form>
  );
};

export default AddVehicleForm;
