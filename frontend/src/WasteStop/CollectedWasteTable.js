// CollectedWasteTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CollectedWasteTable() {
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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Truck Number</th>
            <th className="py-2 px-4 border">Waste Collector</th>
            <th className="py-2 px-4 border">Area</th>
            <th className="py-2 px-4 border">Paper Waste (%)</th>
            <th className="py-2 px-4 border">Food Waste (%)</th>
            <th className="py-2 px-4 border">Polythene Waste (%)</th>
            <th className="py-2 px-4 border">Total Waste (%)</th>
            <th className="py-2 px-4 border">Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {wasteData.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{item.truckNumber}</td>
              <td className="py-2 px-4 border">{item.wasteCollector}</td>
              <td className="py-2 px-4 border">{item.area}</td>
              <td className="py-2 px-4 border">{item.paperWaste}</td>
              <td className="py-2 px-4 border">{item.foodWaste}</td>
              <td className="py-2 px-4 border">{item.polytheneWaste}</td>
              <td className="py-2 px-4 border">{item.totalWaste}</td>
              <td className="py-2 px-4 border">{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollectedWasteTable;
