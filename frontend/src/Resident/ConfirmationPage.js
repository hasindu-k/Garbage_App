import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './ResidentNavbar';
import Footer from '../components/Footer';

function ConfirmationPage() {
  const location = useLocation();

  // Fallback message in case location.state is undefined
  const message = location?.state?.message || 'Request completed!';

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2>{message}</h2>
        <p>Thank you for submitting your details.</p>
      </div>
      <Footer />
    </div>
  );
}

// Define the styles object
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
  },
};

export default ConfirmationPage;
