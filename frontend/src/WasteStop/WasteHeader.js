// WasteHeader.js
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function WasteHeader(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Toggle the menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="h-20 bg-gradient-to-r from-teal-600 to-teal-800 p-4 text-white flex justify-between items-center shadow-md">
      {/* Align the h1 to the left */}
      <h1 className="text-3xl font-bold">{props.h1}</h1>
      
      {/* Center the navigation tabs */}
      <nav className="flex justify-end space-x-6 text-xl">
        <Link to="/CollectedWasteDashboard" className="hover:underline">Dashboard</Link>
        <Link to="/RecycleForm" className="hover:underline">Recycling</Link>
        <Link to="/GarbageStationSummary" className="hover:underline">Analysis</Link>
      </nav>

      {/* Menu bar icon for user options */}
      <div className="relative" ref={menuRef}>
        {/* Hamburger Icon */}
        <button 
          onClick={toggleMenu}
          className="flex flex-col justify-center items-center focus:outline-none"
        >
          <div className="bg-white h-1 w-6 mb-1"></div>
          <div className="bg-white h-1 w-6 mb-1"></div>
          <div className="bg-white h-1 w-6"></div>
        </button>

        {/* Menu options */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
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
      </div>
    </header>
  );
}

export default WasteHeader;
