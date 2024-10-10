// WasteTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CollectedWasteTable = () => {
  const [wasteData, setWasteData] = useState([]);

  useEffect(() => {
    const fetchWasteData = async () => {
      try {
        const response = await axios.get('/api/collectedwaste');
        setWasteData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchWasteData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Truck Number</th>
          <th>Waste Collector</th>
          <th>Area</th>
          <th>Paper Waste (%)</th>
          <th>Food Waste (%)</th>
          <th>Polythene Waste (%)</th>
          <th>Total Waste (%)</th>
          <th>Date & Time</th>
        </tr>
      </thead>
      <tbody>
        {wasteData.map((item) => (
          <tr key={item._id}>
            <td>{item.truckNumber}</td>
            <td>{item.wasteCollector}</td>
            <td>{item.area}</td>
            <td>{item.paperWaste}</td>
            <td>{item.foodWaste}</td>
            <td>{item.polytheneWaste}</td>
            <td>{item.totalWaste}</td>
            <td>{new Date(item.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CollectedWasteTable;
