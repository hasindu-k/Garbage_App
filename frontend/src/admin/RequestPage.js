import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
import AdminNav from "./AdminNav";

function RequestPage() {
  const [requests, setRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);

  // Fetch requests from the API when the component mounts
  useEffect(() => {
    function getAllUserRequests() {
      axios
        .get("http://localhost:8070/schedulePickup/getPickups")
        .then((res) => {
          // Set all statuses to "Scheduled" initially
          const updatedRequests = res.data.map((request) => ({
            ...request,
            status: "Scheduled",
          }));
          setRequests(updatedRequests); // Corrected state setter
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getAllUserRequests(); // Correct function call
  }, []);

  // const requests = [
  //   {
  //     id: "Rgp0123",
  //     name: "Nuwan Perera",
  //     address: "No. 05, Flower Road, Colombo 07, Sri Lanka",
  //     date: "Aug 3, 2024",
  //   },
  //   {
  //     id: "Rgp0124",
  //     name: "Sajith Kumara",
  //     address: "No. 10, Havelock Road, Colombo 05, Sri Lanka",
  //     date: "Aug 3, 2024",
  //   },
  //   {
  //     id: "Rgp0125",
  //     name: "Lakshman de Silva",
  //     address: "No. 23, Horton Place, Colombo 07, Sri Lanka",
  //     date: "Aug 3, 2024",
  //   },
  //   {
  //     id: "Rgp0126",
  //     name: "Tharinda Rajapaksha",
  //     address: "No. 78, Muwambe Junction, Colombo 05, Sri Lanka",
  //     date: "Aug 3, 2024",
  //   },
  //   {
  //     id: "Rgp0127",
  //     name: "Sandun Jayawardena",
  //     address: "No. 12, Galle Road Terrace, Colombo 03, Sri Lanka",
  //     date: "Aug 3, 2024",
  //   },
  //   {
  //     id: "Rgp0128",
  //     name: "Pradeep Wijesinghe",
  //     address: "No. 89, Park Street, Colombo 05, Sri Lanka",
  //     date: "Aug 3, 2024",
  //   },
  //   {
  //     id: "Rgp0129",
  //     name: "Ruwan Bandara",
  //     address: "No. 53, Bandukatha Mawatha, Colombo 07, Sri Lanka",
  //     date: "Aug 3, 2024",
  //   },
  //   {
  //     id: "Rgp0130",
  //     name: "Dinesh Fernando",
  //     address: "No. 34, Duplication Road, Colombo 05, Sri Lanka",
  //     date: "Aug 3, 2024",
  //   },
  //   {
  //     id: "Rgp0130",
  //     name: "Chamara Gunasekara",
  //     address: "No. 8, Rosmead Place, Colombo 07, Sri Lanka",
  //     date: "Aug 3, 2024",
  //   },
  // ];

  return (
    <div className="flex">
      <AdminNav />
      <div className="flex-grow p-6">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h1 className="text-xl font-semibold mb-4">Total Requests</h1>
          <p className="text-lg font-bold mb-4">{requests.length}</p>

          <div className="border-t border-gray-300 py-4">
            <h2 className="text-lg font-semibold mb-2">Request Details</h2>

            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="text-left py-2 px-4 border-b">User ID</th>
                  <th className="text-left py-2 px-4 border-b">Time</th>
                  <th className="text-left py-2 px-4 border-b">Location</th>
                  <th className="text-left py-2 px-4 border-b">Date</th>
                  <th className="text-left py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{request.userID}</td>
                    <td className="py-2 px-4 border-b">{request.time}</td>
                    <td className="py-2 px-4 border-b">{request.location}</td>
                    <td className="py-2 px-4 border-b">{request.date}</td>
                    <td className="py-2 px-4 border-b">
                      <button className="bg-green-500 text-white py-1 px-2 rounded mr-2">
                        View
                      </button>
                      <button className="bg-red-500 text-white py-1 px-2 rounded">
                        Decline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestPage;
