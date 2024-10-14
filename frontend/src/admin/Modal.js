import React from "react";

function Modal({ isOpen, onClose, request }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white p-6 rounded-lg z-50 shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Request Details</h2>
        <p>
          <strong>User ID:</strong> {request.userID}
        </p>
        <p>
          <strong>Time:</strong> {request.time}
        </p>
        <p>
          <strong>Location:</strong> {request.location}
        </p>
        <p>
          <strong>Date:</strong> {request.date}
        </p>

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
