import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './ResidentNavbar'; // Assuming you have a Navbar for consistency
import Footer from '../components/Footer'; // Footer component for consistent layout

function AddGarbageDetailsPage() {
  const [category, setCategory] = useState('');
  const [weight, setWeight] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit garbage details
    navigate('/confirmation', {
      state: { message: 'Garbage details submitted successfully!' },
    });
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h2>Add Garbage Details</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Garbage Category: </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={styles.select}
            >
              <option value="">Select Category</option>
              <option value="organic">Organic Waste</option>
              <option value="plastic">Plastic Waste</option>
              <option value="electronic">Paper Waste</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Weight (kg): </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Submit Details
          </button>
        </form>
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
  form: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginTop: '20px',
  },
  inputGroup: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    marginBottom: '8px',
    fontSize: '16px',
    color: '#333',
  },
  select: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '16px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '16px',
  },
  button: {
    padding: '15px 30px',
    borderRadius: '8px',
    backgroundColor: '#4caf50',
    color: 'white',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
};

export default AddGarbageDetailsPage;
