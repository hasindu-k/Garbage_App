import React from 'react';
import { useLocation } from 'react-router-dom';

function ConfirmationPage() {
  const location = useLocation();

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{location.state?.message || 'Request completed!'}</h2>
      <p>Thank you for submitting your details.</p>
    </div>
  );
}

export default ConfirmationPage;
