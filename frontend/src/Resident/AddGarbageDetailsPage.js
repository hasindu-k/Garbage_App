import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './ResidentNavbar'; // Assuming you have a Navbar for consistency
import Footer from '../components/Footer'; // Footer component for consistent layout
import axios from "axios";



function AddGarbageDetailsPage() {
  const [category, setCategory] = useState('');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [payment, setPayment] = useState(0);
  const navigate = useNavigate();

  // Automatically set the current date when the component loads
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
    setDate(currentDate);
  }, []);

  // Calculate payment when weight changes (100 Rs per kg)
  useEffect(() => {
    setPayment(weight * 100); // Payment is 100 Rs per kg
  }, [weight]);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const newGarbage = {
      category,
      weight,
      date,
      payment

    };

    axios.post("http://localhost:8070/garbage/addGarbage", newGarbage)
      .then(() => {
        alert("Garbade Added");
        navigate('/confirmation', {
          state: { message: 'Your pickup request has been submitted!' },
        });
      })
      .catch((err) => {
        alert(err);
      });



    navigate('/confirmation', {
      state: { message: 'Garbage details submitted successfully!' },
    });
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Add Garbage Details</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Date (Auto-filled) */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Date: </label>
            <input
              type="text"
              value={date}
              readOnly
              style={styles.input}
            />
          </div>

          {/* Category */}
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
              <option value="electronic">Electronic Waste</option>
            </select>
          </div>

          {/* Weight */}
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

          {/* Payment (Auto-calculated) */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Payment (Rs): </label>
            <input
              type="number"
              value={payment}
              readOnly
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.submitButton}>
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
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Make the container take up the full height of the viewport
    backgroundColor: '#F5F5F5',
  },
  formContainer: {
    flex: 1, // Allow the form container to grow and fill the remaining space
    backgroundColor: '#E6F5E6',
    width: '100%',
    maxWidth: '500px',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '20px auto', // Center the form
  },
  title: {
    fontSize: '22px',
    color: '#333',
    marginBottom: '10px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputGroup: {
    marginBottom: '20px',
    width: '100%',
  },
  label: {
    marginBottom: '8px',
    fontSize: '16px',
    color: '#333',
  },
  select: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '16px',
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '16px',
  },
  submitButton: {
    width: '100%',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default AddGarbageDetailsPage;
