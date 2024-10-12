import React from 'react';
import MyRequestsPage from "./Resident/MyRequestsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Resident/HomePage';
import SchedulePickupPage from './Resident/SchedulePickupPage';
import AddGarbageDetailsPage from './Resident/AddGarbageDetailsPage';
import ConfirmationPage from './Resident/ConfirmationPage';
import CollectedWasteTable from './WasteStop/CollectedWasteTable';
import CollectedWasteHome from './WasteStop/CollectedWasteHome';
import RecycleForm from "./WasteStop/RecycleHandover";
import { ToastContainer } from 'react-toastify'; // Importing ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importing Toast CSS
import WasteCollectedUpdateForm from './WasteStop/WasteCollectedUpdateForm';
import CollectedWasteDashboard from './WasteStop/CollectedWasteDashboardy';

function App() {
  return (
    <Router>
      <div>
        <ToastContainer /> {/* Add ToastContainer here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/schedule-pickup" element={<SchedulePickupPage />} />
          <Route path="/add-garbage-details" element={<AddGarbageDetailsPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/MyRequestsPage" element={<MyRequestsPage />} />
          <Route path="/collectedWaste" element={<CollectedWasteHome />} />
          <Route path="/viewCollectedWaste" element={<CollectedWasteTable />} />
          <Route path="/RecycleForm" element={<RecycleForm />} />
          <Route path="/update/:id" element={<WasteCollectedUpdateForm />} />
          <Route path="/CollectedWasteDashboard" element={<CollectedWasteDashboard />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
