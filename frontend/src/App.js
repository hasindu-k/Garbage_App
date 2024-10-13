import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Resident/HomePage';
import SchedulePickupPage from './Resident/SchedulePickupPage';
import AddGarbageDetailsPage from './Resident/AddGarbageDetailsPage';
import ConfirmationPage from './Resident/ConfirmationPage';
import MyRequestsPage from './Resident/MyRequestsPage';
import CollectorHome from './Collector/CollectorHome';
import TotalGarbage from './Collector/TotalGarbage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule-pickup" element={<SchedulePickupPage />} />
        <Route path="/add-garbage-details" element={<AddGarbageDetailsPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/MyRequestsPage" element={<MyRequestsPage />} />
        <Route path="/CollectorHome" element={<CollectorHome />} />
        <Route path="/TotalGarbage" element={<TotalGarbage />} />
      </Routes>
    </Router>
  );
}

export default App;
