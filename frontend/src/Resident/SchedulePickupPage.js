import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from './ResidentNavbar';
import Footer from '../components/Footer';

function SchedulePickupPage() {
  const [date, setdate] = useState('');
  const [time, settime] = useState('');
  const [location, setlocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSchedule = {
      date,
      time,
      location
    };

    axios.post("http://localhost:8070/schedulePickup/addPickup", newSchedule)
      .then(() => {
        alert("Schedule Added");
        navigate('/confirmation', {
          state: { message: 'Your pickup request has been submitted!' },
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const availableLocations = [
    { id: 1, name: 'A/24 16th Street', description: 'Near the community center' },
    { id: 2, name: 'B/12 18th Street', description: 'Next to the park entrance' },
    { id: 3, name: 'C/9 Main Avenue', description: 'Opposite the grocery store' },
    { id: 4, name: 'D/45 Elm Street', description: 'By the main square' },
    { id: 5, name: 'E/3 Oak Road', description: 'Near the school' },
  ];

  // Get today's date in yyyy-mm-dd format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Schedule your pickup</h2>
        <p style={styles.subtitle}>Select your location</p>
        <div style={styles.locationPickerContainer}>
          <select
            value={location}
            onChange={(e) => setlocation(e.target.value)}
            style={styles.selectInput}
          >
            <option value="" disabled>Select location</option>
            {availableLocations.map((loc) => (
              <option key={loc.id} value={loc.name}>
                {loc.name} - {loc.description}
              </option>
            ))}
          </select>
        </div>

        <p style={styles.subtitle}>Select pickup date</p>
        <div style={styles.datePickerContainer}>
          <input
            type="date"
            value={date}
            min={getTodayDate()} // Restrict past dates
            onChange={(e) => setdate(e.target.value)}
            style={styles.selectInput}
          />
        </div>

        <p style={styles.subtitle}>I want the pickup truck to arrive between</p>
        <div style={styles.timeOptions}>
          {['9 AM - 11 AM', '11 AM - 1 PM', '1 PM - 3 PM'].map((timeSlot) => (
            <div style={styles.timeButtonContainer} key={timeSlot}>
              <button
                type="button"
                className={time === timeSlot ? 'active' : ''}
                style={{
                  ...styles.timeButton,
                  backgroundColor: time === timeSlot ? '#C8E6C9' : '#fff',
                }}
                onClick={() => settime(timeSlot)}
              >
                {timeSlot}
              </button>
            </div>
          ))}
        </div>

        <button type="submit" style={styles.submitButton} onClick={handleSubmit}>
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Ensure the container fills the viewport height
    backgroundColor: '#F5F5F5',
  },
  formContainer: {
    flex: 1, // Allow the form container to grow and fill the remaining space
    backgroundColor: '#E6F5E6',
    width: '100%',
    maxWidth: '400px',
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
  locationPickerContainer: {
    margin: '10px 0',
    textAlign: 'center',
  },
  datePickerContainer: {
    margin: '10px 0',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    textAlign: 'center',
    margin: '10px 0',
  },
  selectInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  timeOptions: {
    margin: '20px 0',
  },
  timeButtonContainer: {
    margin: '10px 0',
    textAlign: 'center',
  },
  timeButton: {
    padding: '10px 30px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
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

export default SchedulePickupPage;
