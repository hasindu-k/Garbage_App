import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from './ResidentNavbar';
import {useCookies} from "react-cookie";



function SchedulePickupPage(){

  const [date, setdate] = useState('');
  const [time, settime] = useState('');
  const [location, setlocation] = useState('');
  const navigate = useNavigate();
  const [cookies] = useCookies(["userID"]);
  const userID = cookies.userID;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSchedule = {
      date,
      time,
      location,
      userID
    };

    console.log(newSchedule)

    axios.post("http://localhost:8070/schedulePickup/addPickup", newSchedule)
      .then(() => {
        alert("Schedule Added");
        // navigate('/confirmation', {
        //   state: { message: 'Your pickup request has been submitted!' },
        // });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const availableLocations = [
    { id: 1, name: 'A/24 16th Street', description: 'Pannipitiya' },
    { id: 2, name: 'B/12 18th Street', description: 'Pannipitiya' },
    { id: 3, name: 'C/9 Main Avenue', description: 'Pannipitiya' },
    { id: 4, name: 'D/45 Elm Street', description: 'Pannipitiya' },
    { id: 5, name: 'E/3 Oak Road', description: 'Pannipitiya' },
  ];

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div>
      <div className="flex">
        <Navbar/>
        <div className="flex-1 bg-green-100 w-full max-w-md mx-auto mt-6 rounded-lg p-6 shadow-lg ">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Schedule your pickup</h2>
        <p className="text-center text-gray-600 mb-2">Select your location</p>
        <div className="mb-4">
          <select
            value={location}
            onChange={(e) => setlocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>Select location</option>
            {availableLocations.map((loc) => (
              <option key={loc.id} value={loc.name}>
                {loc.name} - {loc.description}
              </option>
            ))}
          </select>
        </div>

        <p className="text-center text-gray-600 mb-2">Select pickup date</p>
        <div className="mb-4">
          <input
            type="date"
            value={date}
            min={getTodayDate()} 
            onChange={(e) => setdate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <p className="text-center text-gray-600 mb-4">I want the pickup truck to arrive between</p>
        <div className="space-y-4 mb-6">
          {['9 AM - 11 AM', '11 AM - 1 PM', '1 PM - 3 PM'].map((timeSlot) => (
            <button
              type="button"
              key={timeSlot}
              className={`w-full py-2 border rounded-md ${
                time === timeSlot ? 'bg-green-200 border-green-500' : 'bg-white border-gray-300'
              }`}
              onClick={() => settime(timeSlot)}
            >
              {timeSlot}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
      </div>
    </div>

  );
}

export default SchedulePickupPage;