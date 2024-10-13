// WasteHeader.js
import React from 'react';
import { Link } from 'react-router-dom';

function WasteHeader(props) {
  return (
    <header className="bg-teal-800 p-4 text-white">
      
      <h1 className="text-2xl font-bold text-center text-white">{props.h1}</h1>
      {/* Garbage Collection Recorder Dashboard */}
      <nav className="mt-4 flex justify-center space-x-4">
        <Link to="/collectedWaste">Dashboard</Link>
        <Link to="/RecycleForm">Recycle Handover</Link>
        <Link to="/notifications">Notifications</Link>
      </nav>
    </header>
  );
};

export default WasteHeader;
