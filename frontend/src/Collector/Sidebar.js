import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen bg-green-800 text-white w-64 flex flex-col">
      <div className="text-2xl font-bold py-4 px-6 bg-green-700">
        Navigation
      </div>
      <nav className="mt-10 flex-grow">
        <ul className="flex flex-col"> {/* Ensure vertical alignment */}
          <li className="mb-4">
            <Link to="/CollectorHome" className="block py-2 px-6 hover:bg-green-600">Approved Pickups</Link>
          </li>
          <li className="mb-4">
            <Link to="/TotalGarbage" className="block py-2 px-6 hover:bg-green-600">TotalGarbage</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
