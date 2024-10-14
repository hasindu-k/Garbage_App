import React from 'react';
import WasteHeader from './WasteHeader';
import WasteCollectedForm from './WasteCollectedForm';
import Button from '../components/Button';

const CollectedWasteHome = () => {
  return (
    <div className="flex flex-col h-screen scrollbar-hide bg-slate-200">
      {/* Header */}
      <div className="h-[20%]">
        <WasteHeader h1="Collected Waste Recording Portal" />
      </div>

      {/* Form area with scrollable content */}
      <div className="h-[60%] overflow-y-auto p-4">
        <WasteCollectedForm />
      </div>

      {/* Bottom bar - remains at the bottom */}
      <div className="fixed w-full bottom-0 z-10 bg-white border-t h-20 flex justify-between items-center px-5 lg:px-10">
        <Button Button1="Cancel" Button2="Record New" />
      </div>
    </div>
  );
};

export default CollectedWasteHome;
