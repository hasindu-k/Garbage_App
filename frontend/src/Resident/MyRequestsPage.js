import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const MyRequestsPage = () => {
  const navigate = useNavigate();

  // Sample data representing user requests. This could be fetched from an API or a database.
  const [requests, setRequests] = useState([
    { id: 1, date: '2024-10-15', status: 'Scheduled', category: 'Organic Waste', weight: 10, payment: 12.50 },
    { id: 2, date: '2024-10-05', status: 'Completed', category: 'Plastic Waste', weight: 5, payment: 9.00 },
    { id: 3, date: '2024-09-10', status: 'Canceled', category: 'Hazardous Waste', weight: 2, payment: 2.50 },
    { id: 4, date: '2024-10-20', status: 'Scheduled', category: 'Glass', weight: 3, payment: 5.00 },
    { id: 5, date: '2024-09-25', status: 'Scheduled', category: 'Metal', weight: 10, payment: 17.50 },
    { id: 6, date: '2024-10-12', status: 'Scheduled', category: 'Plastic Waste', weight: 7, payment: 10.50 },
  ]);

  // Group by month and category
  const groupedRequests = groupRequestsByMonthAndCategory(requests);

  const handleEditRequest = (id) => {
    navigate(`/edit-request/${id}`);
  };

  const handleCancelRequest = (id) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'Canceled' } : request
    ));
  };

  const handleDeleteRequest = (id) => {
    setRequests(requests.filter(request => request.id !== id));
  };

  return (
    <div style={styles.container}>
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
                    icon={faEdit} 
                    style={styles.icon} 
                    onClick={() => handleEditRequest(request.id)} 
                    title="Edit" 
                  />
                  {request.status !== 'Completed' && (
                    <FontAwesomeIcon 
                      icon={faTimesCircle} 
                      style={styles.icon} 
                      onClick={() => handleCancelRequest(request.id)} 
                      title="Cancel" 
                    />
                  )}
                  <FontAwesomeIcon 
                    icon={faTrash} 
                    style={styles.icon} 
                    onClick={() => handleDeleteRequest(request.id)} 
                    title="Delete" 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
