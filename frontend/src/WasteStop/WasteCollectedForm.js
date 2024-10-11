// WasteCollectedForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WasteCollectedForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    truckNumber: '',
    wasteCollector: '',
    area: '',
    paperWaste: '',
    foodWaste: '',
    polytheneWaste: '',
  });

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
      await axios.post('http://localhost:8070/collectedwaste/addCollectedWaste', {
        ...formData,
        totalWaste,
      });
      alert('Data submitted successfully');
      navigate('/viewCollectedWaste')
      setFormData({
        truckNumber: '',
        wasteCollector: '',
        area: '',
        paperWaste: '',
        foodWaste: '',
        polytheneWaste: '',
      });
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-center mb-4">Collected Waste Recording form</h1>
      <label className="block mb-2 font-semibold">Truck Number:</label>
      <input
        name="truckNumber"
        value={formData.truckNumber}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <label className="block mb-2 font-semibold">Waste Collector:</label>
      <input
        name="wasteCollector"
        value={formData.wasteCollector}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <label className="block mb-2 font-semibold">Area:</label>
      <input
        name="area"
        value={formData.area}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <label className="block mb-2 font-semibold">Paper Waste (%):</label>
      <input
        name="paperWaste"
        value={formData.paperWaste}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <label className="block mb-2 font-semibold">Food Waste (%):</label>
      <input
        name="foodWaste"
        value={formData.foodWaste}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <label className="block mb-2 font-semibold">Polythene Waste (%):</label>
      <input
        name="polytheneWaste"
        value={formData.polytheneWaste}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="w-full p-2 mt-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default WasteCollectedForm;
