import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';  // Import Sidebar


const CollectorHome = () => {
  const [approvedPickups, setApprovedPickups] = useState([]);

  useEffect(() => {
    // Fetch the approved pickups from the backend
    axios.get("http://localhost:8070/approvedpickup/getapproved")
      .then((response) => {
        setApprovedPickups(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the approved pickups!', error);
      });
  }, []);

  // Function to handle completion status change
  const handleCompletion = (index) => {
    const updatedPickups = [...approvedPickups];
    // Toggle the status between 'Completed' and 'Pending'
    updatedPickups[index].status = updatedPickups[index].status === 'Completed' ? 'Pending' : 'Completed';

    // Log the updated pickups to see if the state is changing
    console.log('Updated pickups:', updatedPickups);

    // Make an API call to update the status in the backend
    axios.post(`http://localhost:8070/approvedpickup/update/${updatedPickups[index]._id}`, {
      status: updatedPickups[index].status // Change here to use 'status'
    })
    .then((response) => {
      console.log('Pickup status updated!', response);
      // Update the local state with the new status from the server
      setApprovedPickups(updatedPickups);
    })
    .catch((error) => {
      console.error('There was an error updating the pickup status!', error);
    });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="bg-green-100 min-h-screen flex flex-col items-center justify-center flex-grow">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Approved Garbage Pickups</h1>
        
        <div className="w-full max-w-4xl">
          {approvedPickups.length > 0 ? (
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-green-600">
                <tr>
                  <th className="py-3 px-6 text-left text-white font-semibold uppercase">User ID</th>
                  <th className="py-3 px-6 text-left text-white font-semibold uppercase">Date</th>
                  <th className="py-3 px-6 text-left text-white font-semibold uppercase">Time</th>
                  <th className="py-3 px-6 text-left text-white font-semibold uppercase">Location</th>
                  <th className="py-3 px-6 text-left text-white font-semibold uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {approvedPickups.map((pickup, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-6">{pickup.userid}</td>
                    <td className="py-3 px-6">{pickup.date}</td>
                    <td className="py-3 px-6">{pickup.time}</td>
                    <td className="py-3 px-6">{pickup.location}</td>
                    <td className="py-3 px-6">
                      <input
                        type="checkbox"
                        checked={pickup.status === 'Completed'}
                        onChange={() => handleCompletion(index)}
                        className="h-4 w-4 text-green-600"
                      />
                      <span className="ml-2">{pickup.status}</span> {/* Displaying the status directly */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-green-700 text-lg">No approved pickups found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectorHome;
