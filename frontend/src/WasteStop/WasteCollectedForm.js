// WasteGotForm.js
import React, { useState } from 'react';
import axios from 'axios';

const WasteCollectedForm = () => {
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
    <form onSubmit={handleSubmit}>
      <label>Truck Number: 
        <input name="truckNumber" value={formData.truckNumber} onChange={handleChange} />
      </label>
      <label>Waste Collector: 
        <input name="wasteCollector" value={formData.wasteCollector} onChange={handleChange} />
      </label>
      <label>Area: 
        <input name="area" value={formData.area} onChange={handleChange} />
      </label>
      <label>Paper Waste (%): 
        <input name="paperWaste" value={formData.paperWaste} onChange={handleChange} />
      </label>
      <label>Food Waste (%): 
        <input name="foodWaste" value={formData.foodWaste} onChange={handleChange} />
      </label>
      <label>Polythene Waste (%): 
        <input name="polytheneWaste" value={formData.polytheneWaste} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default WasteCollectedForm;
