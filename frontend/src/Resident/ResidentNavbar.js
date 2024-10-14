import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="h bg-green-800 text-white w-64 flex flex-col">
      <div className="text-2xl font-bold py-4 px-6 bg-green-700">
        EcoSmart
      </div>
      <nav className="mt-10 flex-grow">
        <ul className="flex flex-col"> {/* Ensure vertical alignment */}
          <li className="mb-4">
            <Link to="/" className="block py-2 px-6 hover:bg-green-600">Home</Link>
          </li>
          <li className="mb-4">
            <Link to="/add-garbage-details" className="block py-2 px-6 hover:bg-green-600">Garbage</Link>
          </li>
          <li className="mb-4">
            <Link to="/schedule-pickup" className="block py-2 px-6 hover:bg-green-600">Schedule Pickups</Link>
          </li>
          <li className="mb-4">
            <Link to="/MyRequestsPage" className="block py-2 px-6 hover:bg-green-600">My Requests</Link>
          </li>
          <li className="mb-4">
            <Link to="#" className="block py-2 px-6 hover:bg-green-600">Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;