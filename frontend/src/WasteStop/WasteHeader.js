// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function WasteHeader() {
  return (
    <header>
      <h1>Garbage Collection Recorder Dashboard</h1>
      <nav>
        <Link to="/collectedWaste">Dashboard</Link>
        <Link to="/RecycleHandover">Recycle Handover</Link>
        <Link to="/notifications">Notifications</Link>
      </nav>
    </header>
  );
};

export default WasteHeader;
