import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SchedulePickupPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle pickup request goes here
    navigate('/confirmation', {
      state: { message: 'Your pickup request has been submitted!' },
    });
  };

  const availableLocations = [
    { id: 1, name: 'A/24 16th Street', description: 'Near the community center' },
    { id: 2, name: 'B/12 18th Street', description: 'Next to the park entrance' },
    { id: 3, name: 'C/9 Main Avenue', description: 'Opposite the grocery store' },
    { id: 4, name: 'D/45 Elm Street', description: 'By the main square' },
    { id: 5, name: 'E/3 Oak Road', description: 'Near the school' },
  ];

  return (
    <div style={styles.container}>
      {/* Scheduling Form */}
      <div style={styles.formContainer}>
        {/* Location Selection */}
        <h2 style={styles.title}>Schedule your pickup</h2>
        <p style={styles.subtitle}>Select your location</p>
        <div style={styles.locationPickerContainer}>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={styles.selectInput}
          >
            <option value="" disabled>Select location</option>
            {availableLocations.map((location) => (
              <option key={location.id} value={location.name}>
                {location.name} - {location.description}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selection */}
        <p style={styles.subtitle}>Select pickup date</p>
        <div style={styles.datePickerContainer}>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={styles.selectInput}
          />
        </div>

        {/* Time Selection as Rows */}
        <p style={styles.subtitle}>I want the pickup truck to arrive between</p>
        <div style={styles.timeOptions}>
          <div style={styles.timeButtonContainer}>
            <button
              type="button"
              className={selectedTime === '9am-12pm' ? 'active' : ''}
              style={{
                ...styles.timeButton,
                backgroundColor: selectedTime === '9am-12pm' ? '#C8E6C9' : '#fff',
              }}
              onClick={() => setSelectedTime('9am-12pm')}
            >
              9 AM - 12 PM
            </button>
          </div>
          <div style={styles.timeButtonContainer}>
            <button
              type="button"
              className={selectedTime === '12pm-3pm' ? 'active' : ''}
              style={{
                ...styles.timeButton,
                backgroundColor: selectedTime === '12pm-3pm' ? '#C8E6C9' : '#fff',
              }}
              onClick={() => setSelectedTime('12pm-3pm')}
            >
              12 PM - 3 PM
            </button>
          </div>
          <div style={styles.timeButtonContainer}>
            <button
              type="button"
              className={selectedTime === '3pm-6pm' ? 'active' : ''}
              style={{
                ...styles.timeButton,
                backgroundColor: selectedTime === '3pm-6pm' ? '#C8E6C9' : '#fff',
              }}
              onClick={() => setSelectedTime('3pm-6pm')}
            >
              3 PM - 6 PM
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.submitButton} onClick={handleSubmit}>
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    height: '100vh',
    padding: '20px',
  },
  formContainer: {
    backgroundColor: '#E6F5E6',
    width: '100%',
    maxWidth: '400px',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
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
    margin: '10px 0', // Add space between buttons
    textAlign: 'center', // Center buttons in the container
  },
  timeButton: {
    padding: '10px 30px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%', // Make the button full width
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
