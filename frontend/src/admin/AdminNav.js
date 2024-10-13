import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <div className="h-screen bg-green-800 text-white w-64 flex flex-col">
      <div className="text-2xl font-bold py-4 px-6 bg-green-700">
        Navigation
      </div>
      <nav className="mt-10 flex-grow">
        <ul className="flex flex-col"> {/* Ensure vertical alignment */}
          <li className="mb-4">
            <Link to="/AdminHome" className="block py-2 px-6 hover:bg-green-600">Home</Link>
          </li>
          <li className="mb-4">
            <Link to="/requestPage" className="block py-2 px-6 hover:bg-green-600">Requests</Link>
          </li>
          <li className="mb-4">
            <Link to="/manageVehicles" className="block py-2 px-6 hover:bg-green-600">Manage Vehicles</Link>
          </li>
          <li className="mb-4">
            <Link to="/manageCollectors" className="block py-2 px-6 hover:bg-green-600">Manage Collectors</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNav;