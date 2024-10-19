import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { getVehicles } from "../services/vehicleService.js";

function Modal({ isOpen, onClose, request }) {
  const [collectors, setCollectors] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollector, setSelectedCollector] = useState("");
  const [selectedTruck, setSelectedTruck] = useState("");

  const handleAllocate = () => {
    assignCollector();
    message.success(`Allocated to collector: ${selectedCollector}`);
    onClose();
  };

  const assignCollector = async () => {
    
  }

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

  const fetchVehicles = async () => {
    const response = await getVehicles();
    setTrucks(response.data);
  };

  useEffect(() => {
    if (isOpen) {
      getCollectors();
      fetchVehicles();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white p-6 rounded-lg z-50 shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Request Details</h2>
        <p><strong>User ID:</strong> {request.userID}</p>
        <p><strong>Time:</strong> {request.time}</p>
        <p><strong>Location:</strong> {request.location}</p>
        <p><strong>Date:</strong> {request.date}</p>

        <div className="mt-4">
          <strong>Collectors:</strong>
          {loading ? (
            <p>Loading collectors...</p>
          ) : (
            <select
              value={selectedCollector}
              onChange={(e) => setSelectedCollector(e.target.value)}
              className="border rounded p-2 mt-2 w-full"
            >
              <option value="" disabled>Select a collector</option>
              {collectors.map((collector) => (
                <option key={collector.id} value={collector.id}>
                  {collector.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="mt-4">
          <strong>Truck:</strong>
          {loading ? (
            <p>Loading trucks...</p>
          ) : (
            <select
              value={selectedTruck}
              onChange={(e) => setSelectedTruck(e.target.value)}
              className="border rounded p-2 mt-2 w-full"
            >
              <option value="" disabled>Select a truck</option>
              {trucks.map((truck) => (
                <option key={truck.id} value={truck.id}>
                  {truck.truckNo} - {truck.area}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <Button onClick={onClose} className="bg-red-500 text-white">
            Close
          </Button>
          <Button
            onClick={handleAllocate}
            className="bg-green-500 text-white"
            disabled={loading || !selectedCollector}
          >
            Allocate
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
