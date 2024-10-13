import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'; // Use React Icons for toggle icons

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="relative flex">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={toggleSidebar} /> // Overlay background
      )}
      <div
        className={`fixed left-0 top-0 h-full bg-green-800 text-white w-64 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-30`}
      >
        <div className="text-2xl font-bold py-4 px-6 bg-green-700">Navigation</div>
        <nav className="mt-10 flex-grow">
          <ul className="flex flex-col">
            <li className="mb-4">
              <Link to="/" className="block py-2 px-6 hover:bg-green-600">Home</Link>
            </li>
            <li className="mb-4">
              <Link to="/add-garbage-details" className="block py-2 px-6 hover:bg-green-600">Add Garbage</Link>
            </li>
            <li className="mb-4">
              <Link to="/schedule-pickup" className="block py-2 px-6 hover:bg-green-600">Schedule Pickup</Link>
            </li>
            <li className="mb-4">
              <Link to="/MyRequestsPage" className="block py-2 px-6 hover:bg-green-600">My Requests</Link>
            </li>
            <li className="mb-4">
              <Link to="/profile" className="block py-2 px-6 hover:bg-green-600">Profile</Link>
            </li>
          </ul>
        </nav>
      </div>

      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center h-12 w-12 bg-green-700 text-white rounded-full focus:outline-none fixed top-5 left-5 z-40"
      >
        {isSidebarOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />} {/* Toggle icons */}
      </button>

      {/* Main content */}
      <div className={`flex-grow transition-opacity duration-300 ${isSidebarOpen ? 'opacity-50' : 'opacity-100'}`}>        
      </div>
    </div>
  );
};

export default Navbar;
