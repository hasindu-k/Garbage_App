import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Divider } from "antd";

function Modal({ isOpen, onClose, request }) {
  // State hooks should be called regardless of the isOpen condition
  const [collectors, setCollectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollector, setSelectedCollector] = useState("");

  const handleAllocate = () => {
    // Logic to handle allocation with the selected collector
    console.log("Allocated to collector:", selectedCollector);
    // Add further allocation logic here
    message.success(`Allocated to collector: ${selectedCollector}`);
    onClose();
  };

  const allocateCollector = async () => {};

  const getCollectors = async () => {
    try {
      const response = await fetch("http://localhost:8070/user/collector");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setCollectors(data);
    } catch (error) {
      console.error("Error fetching collectors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getCollectors();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white p-6 rounded-lg z-50 shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Request Details</h2>
        <p>
          <strong>User ID:</strong> {request.userID}
        </p>
        <p>
          <strong>Time:</strong> {request.time}
        </p>
        <p>
          <strong>Location:</strong> {request.location}
        </p>
        <p>
          <strong>Date:</strong> {request.date}
        </p>
        {/* Collectors dropdown */}
        <p className="mt-4">
          <strong>Collectors:</strong>
        </p>
        {loading ? (
          <p>Loading collectors...</p>
        ) : (
          <select
            value={selectedCollector}
            onChange={(e) => setSelectedCollector(e.target.value)}
            className="border rounded p-2 mt-2 w-full"
          >
            <option value="" disabled>
              Select a collector
            </option>
            {collectors.map((collector) => (
              <option key={collector.id} value={collector.id}>
                {collector.name}
              </option>
            ))}
          </select>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Close
          </button>
          <button
            onClick={handleAllocate}
            className="bg-green-500 text-white py-2 px-4 rounded"
            disabled={loading || !selectedCollector}
          >
            Allocate
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
