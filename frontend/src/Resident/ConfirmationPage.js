import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './ResidentNavbar';
import Footer from '../components/Footer';

function ConfirmationPage() {
  const location = useLocation();

  // Fallback message in case location.state is undefined
  const message = location?.state?.message || 'Request completed!';

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gray-100">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{message}</h2>
        <p className="text-lg text-gray-600">Thank you for submitting your details.</p>
      </div>
      <Footer />
    </div>
  );
}

export default ConfirmationPage;
