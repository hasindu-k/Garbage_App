import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Navbar from './ResidentNavbar';
import Footer from '../components/Footer';
import axios from 'axios';

const MyRequestsPage = () => {
  const navigate = useNavigate();

  // State to store user requests
  const [requests, setRequests] = useState([]);

  // Fetch requests from the API when the component mounts
  useEffect(() => {
    function getRequests() {
      axios.get("http://localhost:8070/garbage/getAllGarbage")
        .then((res) => {
          // Set all statuses to "Scheduled" initially
          const updatedRequests = res.data.map(request => ({
            ...request,
            status: 'Scheduled'
          }));
          setRequests(updatedRequests);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getRequests();
  }, []);

  // Group requests by month and category
  const groupedRequests = groupRequestsByMonthAndCategory(requests);

  // Function to handle canceling the request (i.e., marking as "Canceled")
  const handleCancelRequest = (id) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'Canceled' } : request
    ));
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <h2>My Monthly Pickup Requests</h2>
      {groupedRequests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Weight (kg)</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groupedRequests.map((request, index) => (
              <tr key={index}>
                <td>{request.displayDate}</td>
                <td>{request.category}</td>
                <td>{request.totalWeight}</td>
                <td>${request.totalPayment.toFixed(2)}</td>
                <td>{request.status}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={styles.icon}
                    onClick={() => handleCancelRequest(request.id)}  // Changes status to Canceled
                    title="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Footer />
    </div>
  );
};

// Function to group requests by month and category
const groupRequestsByMonthAndCategory = (requests) => {
  const grouped = {};

  requests.forEach(request => {
    const date = new Date(request.date);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' }); // e.g., "October 2024"

    if (!grouped[monthYear]) {
      grouped[monthYear] = {};
    }

    if (!grouped[monthYear][request.category]) {
      grouped[monthYear][request.category] = {
        date: monthYear,
        category: request.category,
        totalWeight: 0,
        totalPayment: 0,
        status: request.status, // Store the first status found
        id: request.id, // Store the first id found
        displayDate: request.date // Store the specific date for display
      };
    }

    grouped[monthYear][request.category].totalWeight += request.weight;
    grouped[monthYear][request.category].totalPayment += request.payment;

    // Update the status to the latest for the category in the month
    grouped[monthYear][request.category].status = request.status;
  });

  // Convert grouped object to an array
  return Object.values(grouped).flatMap(monthGroup => Object.values(monthGroup));
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  table: {
    margin: '20px auto',
    borderCollapse: 'collapse',
    width: '80%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    padding: '10px',
    cursor: 'pointer',
    color: '#4caf50',
    transition: 'color 0.3s',
  },
};

export default MyRequestsPage;
