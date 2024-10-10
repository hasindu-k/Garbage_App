import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Resident/HomePage';
import SchedulePickupPage from './Resident/SchedulePickupPage';
import AddGarbageDetailsPage from './Resident/AddGarbageDetailsPage';
import ConfirmationPage from './Resident/ConfirmationPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule-pickup" element={<SchedulePickupPage />} />
        <Route path="/add-garbage-details" element={<AddGarbageDetailsPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
