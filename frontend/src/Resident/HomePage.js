import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './ResidentNavbar';
import Footer from '../components/Footer';
import Garbage_pic1 from '../assets/Garbage_pic1.jpeg'; // Replace with the correct file type
import DustbinImage from '../assets/dustbin.png'; // Add your dustbin image here

function HomePage() {
  const navigate = useNavigate();

  // Function to get the next scheduled collection date
  const getNextScheduledCollectionDate = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Check if today is before or after the 15th
    if (today.getDate() < 15) {
      return new Date(currentYear, currentMonth, 15);
    } else {
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
      <Navbar style={styles.navbar} />

      <div style={styles.overlay}>
        <div style={styles.content}>
          <div style={styles.overviewSection}>
            <p>Welcome to your Smart Waste Management Dashboard. Here you can track your next collection date, add garbage details, or request early pickups.</p>
          </div>

          <div style={styles.card}>
            <h3>Next Scheduled Collection:</h3>
            <p style={styles.date}>{formatDate(nextScheduledCollectionDate)}</p>
          </div>

          {/* New Advice Section */}
          <div style={styles.adviceCard}>
            <h3 style={styles.adviceTitle}>Separate Your Waste!</h3>
            <img src={DustbinImage} alt="Dustbin" style={styles.dustbinImage} />
            <p>Please separate your garbage into the following categories:</p>
            <div style={styles.categories}>
              <div style={styles.categoryCard}>
                <h4 style={styles.categoryTitle}>🌱 Organic Waste</h4>
                <p>Food scraps, yard waste, etc.</p>
              </div>
              <div style={styles.categoryCard}>
                <h4 style={styles.categoryTitle}>🛍️ Polyethylene Waste</h4>
                <p>Plastic bags, containers, etc.</p>
              </div>
              <div style={styles.categoryCard}>
                <h4 style={styles.categoryTitle}>📄 Paper Waste</h4>
                <p>Cardboard, newspapers, etc.</p>
              </div>
            </div>
            <p>This helps in recycling and managing waste effectively.</p>
          </div>
        </div>
      </div>

      <Footer style={styles.footer} />
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    backgroundImage: `url(${Garbage_pic1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    position: 'relative',
  },
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 2,
    backgroundColor: '#333',
  },
  overlay: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '80px 20px 60px', // Add padding to account for navbar and footer
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    textAlign: 'center',
    padding: '40px',
    width: '100%',
    maxWidth: '900px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Increase opacity for better readability
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Add shadow for depth
    color: '#333',
    zIndex: 1,
  },
  overviewSection: {
    marginBottom: '40px',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '25px',
    margin: '20px 0',
  },
  adviceCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '25px',
    margin: '20px 0',
  },
  adviceTitle: {
    marginBottom: '10px',
  },
  dustbinImage: {
    width: '120px', // Increase size for better visibility
    height: 'auto',
    margin: '10px 0',
  },
  date: {
    fontSize: '18px',
    margin: '10px 0',
    color: '#333',
  },
  categories: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '20px 0',
    flexWrap: 'wrap',
  },
  categoryCard: {
    backgroundColor: '#e0f7fa',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    margin: '10px',
    width: '30%', // Adjust width for smaller screens
    minWidth: '150px', // Ensure minimum width
  },
  categoryTitle: {
    margin: '0',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 0',
    textAlign: 'center',
    zIndex: 2,
  },
};

export default HomePage;
