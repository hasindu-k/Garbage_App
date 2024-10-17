import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Sidebar = () => {
  const [cookies] = useCookies(["userID"]);

  // Fallback to ensure userID is defined
  const userId = cookies.userID || '';

  return (
    <div className="h-screen bg-green-800 text-white w-64 flex flex-col">
      <div className="text-2xl font-bold py-4 px-6 bg-green-700">
        Navigation
      </div>
      <nav className="mt-10 flex-grow">
        <ul className="flex flex-col">
          <li className="mb-4">
            <Link 
              to={`/CollectorHome/${userId}`} 
              className="block py-2 px-6 hover:bg-green-600"
            >
              Approved Pickups
            </Link>
          </li>
          <li className="mb-4">
            <Link 
              to="/TotalGarbage" 
              className="block py-2 px-6 hover:bg-green-600"
            >
              Total Garbage
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
