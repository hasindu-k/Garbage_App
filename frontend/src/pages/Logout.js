// Logout.js
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userID']);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove userID cookie to log out
    removeCookie('userID');
    
    // Optionally, clear other cookies or local storage items
    // localStorage.removeItem('yourStorageKey'); // Example for local storage

    // Redirect to the login page or home page after logout
    navigate('/login'); // Adjust this path as needed
  };

  useEffect(() => {
    Swal.fire({
      title: "Are you sure?",
      text: "Logging out will end your current session. Are you sure you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Log Out",
      customClass: {
        popup: "bg-white rounded-[4px] shadow-2xl ",
        title: "text-lg font-semibold text-secondary-green",
        confirmButton:
          "py-1 px-2 text-sm font-semibold mr-2 text-white bg-green-500 rounded-[4px] hover:bg-green-500/80",
        cancelButton:
          "bg-red-500 px-2 text-white py-1 rounded-[4px] text-sm font-semibold hover:bg-red-500/80",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      } 
      else {
        // Optionally redirect to a different page if the user cancels the logout
        navigate(-1); // Redirect to the previous page
      }
    });
  }, [removeCookie, navigate]); // Ensure useEffect dependencies are correct

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl">Logging out...</h1>
    </div>
  );
};

export default Logout;
