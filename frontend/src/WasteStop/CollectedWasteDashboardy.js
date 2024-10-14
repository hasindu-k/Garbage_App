import React from 'react';
import { Link } from 'react-router-dom';
import WasteHeader from './WasteHeader';

const CollectedWasteDashboard = () => {
  const cardData = [
    {
      title: 'Record Waste Lot',
      description: 'Record details of collected waste lots.',
      link: '/collectedWaste',
    },
    {
      title: 'Request Recycling',
      description: 'Request recycling for collected waste.',
      link: '/RecycleForm',
    },
    {
      title: 'Notify Management',
      description: 'Notify management about waste collection.',
      link: '/notify-management',
    },
    {
      title: 'Collected Waste Details',
      description: 'View details of collected waste.',
      link: '/viewCollectedWaste',
    },
    {
      title: 'Paid Recycled Details',
      description: 'View paid recycling details.',
      link: '/viewRecycledDetails',
    },
    {
      title: 'Reports',
      description: 'Generate waste collection and recycling reports.',
      link: '/reports',
    },
  ];

  return (
    <div>
      <WasteHeader h1="Waste Management Dashboard"/>

    <div className="min-h-screen flex flex-col items-center mb-10">
      {/* Body */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-6 md:px-8 lg:px-12 w-full">
        {cardData.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.description}</p>
          </Link>
        ))}
      </div>

      {/* Footer here */}
      <footer className="mt-auto py-6 text-center">
        <p>&copy; 2024 Waste Management System</p>
      </footer>
    </div>
    </div>
  );
};

export default CollectedWasteDashboard;
