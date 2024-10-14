import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
  const [approvedPickups, setApprovedPickups] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectorsResponse = await axios.get("http://localhost:8070/user/");
        const collectors = collectorsResponse.data.filter(user => user.role === "collector");
        setApprovedPickups(collectors.map(collector => collector.name));

        const locationsResponse = await axios.get("http://localhost:8070/approvedpickup/getapproved");
        const locations = locationsResponse.data.map(location => location.location);
        setLocations(locations);

        const vehiclesResponse = await axios.get("http://localhost:8070/vehicle/allVehicles");
        const truckNumbers = vehiclesResponse.data.map(user => user.truckNo);
        setVehicles(truckNumbers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalWaste = (
      parseFloat(formData.paperWaste) +
      parseFloat(formData.foodWaste) +
      parseFloat(formData.polytheneWaste)
    ).toFixed(2);

    try {
      await axios.post("http://localhost:8070/collectedwaste/addCollectedWaste", {
        ...formData,
        totalWaste,
      });
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
        <Link to="/viewCollectedWaste">
          <button className="bg-green-600 text-white rounded-lg px-6 py-2 hover:bg-green-700 transition duration-300">
            View Collected Waste History
          </button>
        </Link>

        <h1 className="text-2xl font-bold text-center mt-4 mb-6 text-green-700">
          Collected Waste Recording Form
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Truck Number:</label>
              <select
                name="truckNumber"
                value={formData.truckNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Assigned Truck</option>
                {vehicles.map((truckNo, index) => (
                  <option key={index} value={truckNo}>{truckNo}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Waste Collector:</label>
              <select
                name="wasteCollector"
                value={formData.wasteCollector}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Assigned Collector</option>
                {approvedPickups.map((collector, index) => (
                  <option key={index} value={collector}>{collector}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Area:</label>
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Collected Area</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Paper Waste (Kg):</label>
              <input
                name="paperWaste"
                value={formData.paperWaste}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Food Waste (Kg):</label>
              <input
                name="foodWaste"
                value={formData.foodWaste}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Polythene Waste (Kg):</label>
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
      </div>
    </div>
  );
};

export default WasteCollectedForm;
