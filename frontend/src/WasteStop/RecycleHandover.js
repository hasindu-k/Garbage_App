import React, { useState } from 'react';
import axios from 'axios';

const RecycleForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    truckNumber: '',
    area: '',
    paperWeight: 0,
    foodWeight: 0,
    polytheneWeight: 0,
    totalWaste: 0,
    calculatedCharge: 0,
  });

  // Define rates for each waste category (per kg)
  const rateForPaper = 2.0; // Example rate for paper waste
  const rateForFood = 1.5; // Example rate for food waste
  const rateForPolythene = 3.0; // Example rate for polythene waste

  // Function to calculate total waste and charge based on the rates
  const calculateTotals = (updatedFormData) => {
    const paperWeight = parseFloat(updatedFormData.paperWeight);
    const foodWeight = parseFloat(updatedFormData.foodWeight);
    const polytheneWeight = parseFloat(updatedFormData.polytheneWeight);

    // Calculate total waste (sum of weights)
    const totalWaste = paperWeight + foodWeight + polytheneWeight;

    // Calculate charge for each category
    const chargeForPaper = paperWeight * rateForPaper;
    const chargeForFood = foodWeight * rateForFood;
    const chargeForPolythene = polytheneWeight * rateForPolythene;

    // Total calculated charge
    const calculatedCharge = chargeForPaper + chargeForFood + chargeForPolythene;

    return {
      totalWaste: totalWaste.toFixed(2),
      calculatedCharge: calculatedCharge.toFixed(2),
    };
  };

  // Handle change in form fields and update total and charge in real-time
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    // Calculate totals
    const { totalWaste, calculatedCharge } = calculateTotals(updatedFormData);

    // Update state with new form data, total waste, and charge
    setFormData({
      ...updatedFormData,
      totalWaste,
      calculatedCharge,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Submitting data:', formData);

      // Send POST request to backend
      const response = await axios.post(
        'http://localhost:8070/recycleWaste/addRecyclingWastes',
        formData
      );
      console.log('Response from server:', response.data);

      alert('Data submitted successfully');

      // Reset form after submission
      setFormData({
        truckNumber: '',
        area: '',
        paperWeight: 0,
        foodWeight: 0,
        polytheneWeight: 0,
        totalWaste: 0,
        calculatedCharge: 0,
      });
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Recycle Waste Submission</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Truck Number</label>
          <input
            type="text"
            name="truckNumber"
            value={formData.truckNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Area</label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Paper Weight (kg)</label>
          <input
            type="number"
            name="paperWeight"
            value={formData.paperWeight}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Food Weight (kg)</label>
          <input
            type="number"
            name="foodWeight"
            value={formData.foodWeight}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Polythene Weight (kg)</label>
          <input
            type="number"
            name="polytheneWeight"
            value={formData.polytheneWeight}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Total Waste (kg)</label>
          <input
            type="number"
            name="totalWaste"
            value={formData.totalWaste}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Calculated Charge ($)</label>
          <input
            type="number"
            name="calculatedCharge"
            value={formData.calculatedCharge}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RecycleForm;
