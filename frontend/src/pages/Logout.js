// Logout.js
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userID']);
  const navigate = useNavigate();

  useEffect(() => {
    // Remove userID cookie to log out
    removeCookie('userID');
    
    // Optionally, clear other cookies or local storage items
    // localStorage.removeItem('yourStorageKey'); // Example for local storage

    // Redirect to the login page or home page after logout
    navigate('/login'); // Adjust this path as needed
  }, [removeCookie, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl">Logging out...</h1>
    </div>
  );
};

export default Logout;
