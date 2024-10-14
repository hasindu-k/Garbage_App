import React from "react";
import Navbar from "./ResidentNavbar";
import { useLocation } from 'react-router-dom';

function ConfirmationPage(){
  const location = useLocation();

  // Fallback message in case location.state is undefined
  const message = location?.state?.message || 'Request completed!';

  return (
    <div>
      <div className="flex">
        <Navbar/>
        <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{message}</h2>
        <p className="text-lg text-gray-600">Thank you for submitting your details.</p>
      </div>
      </div>
    </div>

  );
}

export default ConfirmationPage;