import React, { useState } from 'react';
import axios from 'axios';
import WasteHeader from './WasteHeader';
import Button from '../components/Button';

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
  const rateForPaper = 2.0;
  const rateForFood = 1.5;
  const rateForPolythene = 3.0;

  // Function to calculate total waste and charge based on the rates
  const calculateTotals = (updatedFormData) => {
    const paperWeight = parseFloat(updatedFormData.paperWeight);
    const foodWeight = parseFloat(updatedFormData.foodWeight);
    const polytheneWeight = parseFloat(updatedFormData.polytheneWeight);

    const totalWaste = paperWeight + foodWeight + polytheneWeight;
    const chargeForPaper = paperWeight * rateForPaper;
    const chargeForFood = foodWeight * rateForFood;
    const chargeForPolythene = polytheneWeight * rateForPolythene;
    const calculatedCharge = chargeForPaper + chargeForFood + chargeForPolythene;

    return {
      totalWaste: totalWaste.toFixed(2),
      calculatedCharge: calculatedCharge.toFixed(2),
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    const { totalWaste, calculatedCharge } = calculateTotals(updatedFormData);

    setFormData({
      ...updatedFormData,
      totalWaste,
      calculatedCharge,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Submitting data:', formData);
      const response = await axios.post(
        'http://localhost:8070/recycleWaste/addRecyclingWastes',
        formData
      );
      console.log('Response from server:', response.data);

      alert('Data submitted successfully');

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
    <div>
      <WasteHeader h1="Recycle Request Portal" />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-700">Recycle Waste Requests</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Truck Number</label>
            <input
              type="text"
              name="truckNumber"
              value={formData.truckNumber}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter truck number"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Area</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Enter area"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Paper Weight (kg)</label>
            <input
              type="number"
              name="paperWeight"
              value={formData.paperWeight}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Food Weight (kg)</label>
            <input
              type="number"
              name="foodWeight"
              value={formData.foodWeight}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Polythene Weight (kg)</label>
            <input
              type="number"
              name="polytheneWeight"
              value={formData.polytheneWeight}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Total Waste (kg)</label>
            <input
              type="number"
              name="totalWaste"
              value={formData.totalWaste}
              readOnly
              className="p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Calculated Charge ($)</label>
            <input
              type="number"
              name="calculatedCharge"
              value={formData.calculatedCharge}
              readOnly
              className="p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="  w-full bottom-0 z-10 bg-white border-t h-20 flex justify-between items-center px-5 lg:px-10">
        <Button Button1="Cancel" Button2="Record New" />
      </div>
    </div>
  );
};

export default RecycleForm;
