

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const WasteCollectedForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    truckNumber: "",
    wasteCollector: "",
    area: "",
    paperWaste: "",
    foodWaste: "",
    polytheneWaste: "",
  });
  const [approvedPickups, setApprovedPickups] = useState([]); // State to store fetched collectors
  const [vehicles, setVehicles] = useState([]); // State to store fetched truck numbers
  const [locations, setLocations] = useState([]);

  // Fetch data from MongoDB collections on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch collectors with role "collector"
        const collectorsResponse = await axios.get(
          "http://localhost:8070/user/"
        ); // Replace with your actual endpoint
        const collectors = collectorsResponse.data.filter(
          (user) => user.role === "collector"
        );
        setApprovedPickups(collectors.map((collector) => collector.name));

        // Fetch locations (assuming a field named "location" in the "approvedpickups" collection)
        const locationsResponse = await axios.get(
          "http://localhost:8070/approvedpickup/getapproved"
        ); // Replace with your actual endpoint
        const locations = locationsResponse.data.map(
          (location) => location.location
        );
        setLocations(locations);

        // Fetch truck numbers (assuming a field named "truckNo" in the "users" collection)
        const vehiclesResponse = await axios.get(
          "http://localhost:8070/vehicle/allVehicles"
        ); // Replace with your actual endpoint
        const truckNumbers = vehiclesResponse.data.map((user) => user.truckNo);
        setVehicles(truckNumbers);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error gracefully (e.g., display an error message)
      }
    };
    fetchData();
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalWaste = (
      parseFloat(formData.paperWaste) +
      parseFloat(formData.foodWaste) +
      parseFloat(formData.polytheneWaste)
    ).toFixed(2);

    try {
      await axios.post(
        "http://localhost:8070/collectedwaste/addCollectedWaste",
        {
          ...formData,
          totalWaste,
        }
      );
      //alert("Data submitted successfully");
      //navigate("/viewCollectedWaste");
      setFormData({
        truckNumber: "",
        wasteCollector: "",
        area: "",
        paperWaste: "",
        foodWaste: "",
        polytheneWaste: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data");
    }
  };

  return (
    <>
      <div className="flex justify-between w-full">
        <Link to="/viewCollectedWaste">
        <button className="bg-green-600 text-white rounded-lg px-8 py-3 hover:bg-green-700 transition duration-300 text-left">
          View Collected Waste History{" "}
        </button></Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-green-700">
          Collected Waste Recording Form
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {" "}
          {/* Grid container */}
          <div>
            <label className="block mb-2 font-semibold">Truck Number:</label>
            <select
              name="truckNumber"
              value={formData.truckNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Assigned Truck</option>
              {vehicles.map((truckNo, index) => (
                <option key={index} value={truckNo}>
                  {truckNo}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold">Waste Collector:</label>
            <select
              name="wasteCollector"
              value={formData.wasteCollector}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Assigned Collector</option>
              {approvedPickups.map((collector, index) => (
                <option key={index} value={collector}>
                  {collector}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold">Area:</label>
            <select
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Collected Area</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold">
              Paper Waste (Kg):
            </label>
            <input
              name="paperWaste"
              value={formData.paperWaste}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Food Waste (Kg):</label>
            <input
              name="foodWaste"
              value={formData.foodWaste}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">
              Polythene Waste (Kg):
            </label>
            <input
              name="polytheneWaste"
              value={formData.polytheneWaste}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-2 mt-4 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default WasteCollectedForm;
