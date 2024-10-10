import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './ResidentNavbar';
import Footer from '../components/Footer';

function HomePage() {
  const navigate = useNavigate();

  // Function to get the next scheduled collection date
  const getNextScheduledCollectionDate = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Check if today is before or after the 15th
    if (today.getDate() < 15) {
      // If before the 15th, return the 15th of the current month
      return new Date(currentYear, currentMonth, 15);
    } else {
      // If on or after the 15th, return the 15th of the next month
      return new Date(currentYear, currentMonth + 1, 15);
    }
  };

  // Format the date to a readable string
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  // Get the next scheduled collection date
  const nextScheduledCollectionDate = getNextScheduledCollectionDate();

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <div style={styles.card}>
          <h3>Next Scheduled Collection:</h3>
          <p style={styles.date}>{formatDate(nextScheduledCollectionDate)}</p>
          <button
            style={styles.button}
            onClick={() => navigate('/add-garbage-details')}
          >
            Add Garbage Category & Weight
          </button>
        </div>

        <div style={styles.card}>
          <h3>Need Early Pickup?</h3>
          <button
            style={styles.button}
            onClick={() => navigate('/schedule-pickup')}
          >
            Request Early Pickup
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
  },
  content: {
    textAlign: 'center',
    padding: '20px',
    width: '100%',
    maxWidth: '600px',
  },
  title: {
    margin: '20px 0',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    margin: '20px 0',
    transition: 'transform 0.2s',
  },
  date: {
    fontSize: '18px',
    margin: '10px 0',
    color: '#666',
  },
  button: {
    padding: '15px 30px',
    borderRadius: '8px',
    backgroundColor: '#4caf50',
    color: 'white',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    marginTop: '10px',
  },
  buttonHover: {
    backgroundColor: '#45a049',
    transform: 'scale(1.05)',
  },
  footer: {
    marginTop: 'auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f1f1f1',
    width: '100%',
  },
};

export default HomePage;
