import React from "react";
import "./ResidentNavbar.css";
import toggler_mode from "../assets/mode.jpg";

const Navbar = ({ theme, setTheme }) => {
  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <div className="navbar block">
      <h1 className="flex text-2xl">EcoSmart</h1>

      <ul>
        <a href="/">
          <li>Home</li>
        </a>

        <a href="/add-garbage-details">
          <li>AddGarbage</li>
        </a>

        <a href="/schedule-pickup">
          <li>SchedulePickup</li>
        </a>

        <a href="/MyRequestsPage">
          <li>MyRequests</li>
        </a>

        <a href="#">
          <li>Profile</li>
        </a>

      </ul>

      <img
        onClick={() => {
          toggle_mode();
        }}
        src={toggler_mode}
        alt=""
        className="toggle-icon"
      />
    </div>
  );
};

export default Navbar;