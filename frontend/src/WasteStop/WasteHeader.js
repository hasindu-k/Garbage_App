// WasteHeader.js
import React from 'react';
import { Link } from 'react-router-dom';

function WasteHeader() {
  return (
    <header className="bg-blue-600 p-4 text-white">
      <h1>Garbage Collection Recorder Dashboard</h1>
      <nav className="mt-4 flex justify-center space-x-4">
        <Link to="/collectedWaste">Dashboard</Link>
        <Link to="/RecycleHandover">Recycle Handover</Link>
        <Link to="/notifications">Notifications</Link>
      <h1 className="text-2xl font-bold text-center">Garbage Collection Recorder Dashboard</h1>
      </nav>
    </header>
  );
};

export default WasteHeader;
