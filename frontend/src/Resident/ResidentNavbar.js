import React from "react";
import toggler_mode from "../assets/mode.jpg";

const Navbar = ({ theme, setTheme }) => {
  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div
      className={`w-full h-20 flex items-center justify-between px-10 shadow-md transition-colors duration-300 ${
        theme === "dark" ? "bg-green-800 text-white" : "bg-green-100 text-green-900"
      }`}
    >
      <h1 className="text-2xl font-semibold">EcoSmart</h1>

      <ul className="flex space-x-8 list-none">
        <a href="/" className="hover:text-green-800">
          <li className="text-lg font-medium cursor-pointer">Home</li>
        </a>
        <a href="/add-garbage-details" className="hover:text-green-800">
          <li className="text-lg font-medium cursor-pointer">AddGarbage</li>
        </a>
        <a href="/schedule-pickup" className="hover:text-green-800">
          <li className="text-lg font-medium cursor-pointer">SchedulePickup</li>
        </a>
        <a href="/MyRequestsPage" className="hover:text-green-800">
          <li className="text-lg font-medium cursor-pointer">MyRequests</li>
        </a>
        <a href="#" className="hover:text-green-800">
          <li className="text-lg font-medium cursor-pointer">Profile</li>
        </a>
      </ul>

      <img
        onClick={toggle_mode}
        src={toggler_mode}
        alt="Toggle Mode"
        className="w-10 cursor-pointer transition-transform duration-300 hover:rotate-12"
      />
    </div>
  );
};

export default Navbar;
