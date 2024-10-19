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
  const [collectors, setCollectors] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState({}); // State to hold error messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiclesResponse = await axios.get(
          "http://localhost:8070/vehicle/allVehicles"
        );
        const truckNumbers = vehiclesResponse.data.map((user) => user.truckNo);
        setVehicles(truckNumbers);

        const locationsResponse = await axios.get(
          "http://localhost:8070/approvedpickup/getApprovedPickups"
        );
        const locations = locationsResponse.data.map(
          (location) => location.location
        );
        setLocations(locations);

        const collectorResponse = await axios.get(
          "http://localhost:8070/user/"
        );
        const collectors = collectorResponse.data.map(
          (collector) => collector.name
        );
        setCollectors(collectors);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear any previous error for the field
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate waste collector (only characters)
    const wasteCollectorRegex = /^[a-zA-Z\s]+$/;
    if (!wasteCollectorRegex.test(formData.wasteCollector)) {
      newErrors.wasteCollector = "Waste collector name should contain only letters.";
    }

        // Validate waste collector (only characters)
        const areaRegex = /^[a-zA-Z\s]+$/;
        if (!areaRegex.test(formData.area)) {
          newErrors.area = "Area name should contain only letters.";
        }
    
    // Validate paperWaste, foodWaste, polytheneWaste (whole numbers)
    const wasteRegex = /^[0-9]+$/;
    if (!wasteRegex.test(formData.paperWaste) || formData.paperWaste === "") {
      newErrors.paperWaste = "Paper waste must be a whole number.";
    }
    if (!wasteRegex.test(formData.foodWaste) || formData.foodWaste === "") {
      newErrors.foodWaste = "Food waste must be a whole number.";
    }
    if (!wasteRegex.test(formData.polytheneWaste) || formData.polytheneWaste === "") {
      newErrors.polytheneWaste = "Polythene waste must be a whole number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (!validateForm()) {
      return; // Exit if there are validation errors
    }

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
      setFormData({
        truckNumber: "",
        wasteCollector: "",
        area: "",
        paperWaste: "",
        foodWaste: "",
        polytheneWaste: "",
      });
      navigate("/viewCollectedWaste"); // Redirect after successful submission
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
            {/* <div>
              <label className="block mb-1 font-semibold">Truck Number:</label>
              
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
            </div> */}
            <div>
              <label className="block mb-1 font-semibold">Truck Number:</label>
              <input
                name="truckNumber"
                value={formData.truckNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded "
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Waste Collector:</label>
              <input
                name="wasteCollector"
                value={formData.wasteCollector}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${errors.wasteCollector ? "border-red-500" : ""}`}
              />
              {errors.wasteCollector && <p className="text-red-500">{errors.wasteCollector}</p>}
            </div>
            <div>
              <label className="block mb-1 font-semibold">Area:</label>
              <input
                name="area"
                value={formData.area}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${errors.area ? "border-red-500" : ""}`}
              />
              {errors.area && <p className="text-red-500">{errors.area}</p>}
            </div>

            {/* <div>
              <label className="block mb-1 font-semibold">Area:</label>
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
            </div> */}
            <div>
              <label className="block mb-1 font-semibold">Paper Waste (Kg):</label>
              <input
                name="paperWaste"
                value={formData.paperWaste}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${errors.paperWaste ? "border-red-500" : ""}`}
              />
              {errors.paperWaste && <p className="text-red-500">{errors.paperWaste}</p>}
            </div>
            <div>
              <label className="block mb-1 font-semibold">Food Waste (Kg):</label>
              <input
                name="foodWaste"
                value={formData.foodWaste}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${errors.foodWaste ? "border-red-500" : ""}`}
              />
              {errors.foodWaste && <p className="text-red-500">{errors.foodWaste}</p>}
            </div>
            <div>
              <label className="block mb-1 font-semibold">Polythene Waste (Kg):</label>
              <input
                name="polytheneWaste"
                value={formData.polytheneWaste}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${errors.polytheneWaste ? "border-red-500" : ""}`}
              />
              {errors.polytheneWaste && <p className="text-red-500">{errors.polytheneWaste}</p>}
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
