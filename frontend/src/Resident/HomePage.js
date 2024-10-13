import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './ResidentNavbar';
import Footer from '../components/Footer';
import Garbage_pic1 from '../assets/Garbage_pic1.jpeg'; // Replace with the correct file type
import DustbinImage from '../assets/dustbin.png'; // Add your dustbin image here

function HomePage() {
  const navigate = useNavigate();

  // Function to get the next scheduled collection date
  const getNextScheduledCollectionDate = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Check if today is before or after the 15th
    if (today.getDate() < 15) {
      return new Date(currentYear, currentMonth, 15);
    } else {
      return new Date(currentYear, currentMonth + 1, 15);
    }
  };

  // Format the date to a readable string
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  // Get the next scheduled collection date
  const nextScheduledCollectionDate = getNextScheduledCollectionDate();

  return (
    <div className="flex flex-col justify-between min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${Garbage_pic1})` }}>
      <Navbar className="fixed top-0 left-0 w-full z-10 bg-gray-800" />

      <div className="contaoiner flex justify-center items-center flex-1 py-20 px-4 bg-black bg-opacity-60">
        <div className="text-center p-10 w-full max-w-3xl bg-white bg-opacity-90 rounded-xl shadow-lg z-1 text-gray-800">
          <div className="mb-10">
            <p>Welcome to your Smart Waste Management Dashboard. Here you can track your next collection date, add garbage details, or request early pickups.</p>
          </div>

          <div className="bg-gray-100 rounded-lg shadow-md p-6 my-6">
            <h3 className="text-xl font-semibold">Next Scheduled Collection:</h3>
            <p className="text-lg mt-2">{formatDate(nextScheduledCollectionDate)}</p>
          </div>

          {/* New Advice Section */}
          <div className="bg-white rounded-lg shadow-md p-6 my-6">
            <h3 className="text-xl font-semibold mb-4">Separate Your Waste!</h3>
            <img src={DustbinImage} alt="Dustbin" className="w-28 mx-auto mb-4" />
            <p>Please separate your garbage into the following categories:</p>
            <div className="flex justify-around mt-4 flex-wrap gap-4">
              <div className="bg-cyan-100 rounded-lg shadow-md p-4 w-1/3 min-w-[150px]">
                <h4 className="font-semibold">🌱 Organic Waste</h4>
                <p>Food scraps, yard waste, etc.</p>
              </div>
              <div className="bg-cyan-100 rounded-lg shadow-md p-4 w-1/3 min-w-[150px]">
                <h4 className="font-semibold">🛍️ Polyethylene Waste</h4>
                <p>Plastic bags, containers, etc.</p>
              </div>
              <div className="bg-cyan-100 rounded-lg shadow-md p-4 w-1/3 min-w-[150px]">
                <h4 className="font-semibold">📄 Paper Waste</h4>
                <p>Cardboard, newspapers, etc.</p>
              </div>
            </div>
            <p className="mt-4">This helps in recycling and managing waste effectively.</p>
          </div>
        </div>
      </div>

      <Footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-2 text-center z-10" />
    </div>
  );
}

export default HomePage;
