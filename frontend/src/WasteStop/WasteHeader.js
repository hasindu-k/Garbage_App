// WasteHeader.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function WasteHeader(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="h-20 bg-teal-800 p-4 text-white flex justify-between items-center">
      {/* Align the h1 to the left */}
      <h1 className="text-white text-2xl font-bold">{props.h1}</h1>
      
      {/* Center the navigation tabs */}
      <nav className="flex space-x-4">
        <Link to="/collectedWaste" className="hover:underline">Dashboard</Link>
        <Link to="/RecycleForm" className="hover:underline">Recycle Handover</Link>
        <Link to="/notifications" className="hover:underline">Notifications</Link>
      </nav>

      {/* Right-aligned user options */}
      <div className="relative flex items-center space-x-4">
        {/* Arrow button for user actions */}
        <button 
          className="focus:outline-none" 
          onClick={toggleDropdown}
        >
          ▼
        </button>
        
        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-20 w-48 bg-white text-black rounded-md shadow-lg">
            <Link 
              to="/login" 
              className="block px-4 py-2 hover:bg-gray-200"
            >
              Switch User
            </Link>
            <Link 
              to="/settings" 
              className="block px-4 py-2 hover:bg-gray-200"
            >
              Settings
            </Link>
            <button 
              onClick={() => { /* Add your sign out logic here */ }}
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* User logo (placeholder) */}
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
      </div>
    </header>
  );
}

export default WasteHeader;
