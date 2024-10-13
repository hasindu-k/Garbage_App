import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">My Monthly Pickup Requests</h2>
        {groupedRequests.length === 0 ? (
          <p className="text-center text-lg">No requests found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Weight (kg)</th>
                  <th className="px-4 py-2">Payment</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupedRequests.map((request, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{request.displayDate}</td>
                    <td className="px-4 py-2">{request.category}</td>
                    <td className="px-4 py-2">{request.totalWeight}</td>
                    <td className="px-4 py-2">${request.totalPayment.toFixed(2)}</td>
                    <td className="px-4 py-2">{request.status}</td>
                    <td className="px-4 py-2">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleCancelRequest(request.id)} // Changes status to Canceled
                        title="Delete"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
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

export default MyRequestsPage;
