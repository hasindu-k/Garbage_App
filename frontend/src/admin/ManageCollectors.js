import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import {
  getCollectors,
  getResidentRequests,
  allocateRequestsToCollector,
} from "../services/collectorService.js";

function ManageCollectors() {
  const [collectors, setCollectors] = useState([]);
  const [residentRequests, setResidentRequests] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [allocationMessage, setAllocationMessage] = useState("");

  useEffect(() => {
    fetchCollectors();
    // fetchResidentRequests();
  }, []);

  const fetchCollectors = async () => {
    const response = await getCollectors(); // Fetch users with role 'collector'
    setCollectors(response.data);
  };

  // const fetchResidentRequests = async () => {
  //   const response = await getResidentRequests(); // Fetch resident requests
  //   setResidentRequests(response.data);
  // };

  // const handleAllocateRequests = async (collectorId) => {
  //   try {
  //     await allocateRequestsToCollector(collectorId, selectedRequests);
  //     setAllocationMessage("Requests allocated successfully");
  //     setSelectedRequests([]); // Clear selection after allocation
  //   } catch (error) {
  //     setAllocationMessage("Error in allocating requests");
  //   }
  // };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNav />
      <div className="flex-grow p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-700 mb-8">Allocate Resident Requests to Collectors</h1>

        <div>
          <h2 className="text-xl font-semibold text-gray-600 mb-4">Collector List</h2>
          <div className="space-y-4">
            {collectors.map((collector) => (
              <div
                key={collector._id}
                className="p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col justify-between items-start"
              >
                <p className="font-medium text-gray-700">
                  {collector.name} - {collector.email}
                </p>

                <div className="flex-1 mt-4">
                  <h3 className="text-lg font-semibold">Allocate Resident Requests</h3>
                  <select
                    multiple
                    value={selectedRequests}
                    onChange={(e) =>
                      setSelectedRequests(
                        Array.from(e.target.selectedOptions, (option) => option.value)
                      )
                    }
                    className="mt-2 p-2 border border-gray-300 rounded w-full"
                  >
                    {residentRequests.map((request) => (
                      <option key={request._id} value={request._id}>
                        {request.title} - {request.residentName}
                      </option>
                    ))}
                  </select>
                  <button
                    className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded shadow hover:bg-indigo-600"
                    // onClick={() => handleAllocateRequests(collector._id)}
                  >
                    Allocate Requests
                  </button>
                  {allocationMessage && (
                    <p className="mt-2 text-green-500">{allocationMessage}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCollectors;
