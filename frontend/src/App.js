import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Resident/HomePage";
import SchedulePickupPage from "./Resident/SchedulePickupPage";
import AddGarbageDetailsPage from "./Resident/AddGarbageDetailsPage";
import ConfirmationPage from "./Resident/ConfirmationPage";
import MyRequestsPage from "./Resident/MyRequestsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/schedule-pickup" element={<SchedulePickupPage />} />
        <Route
          path="/add-garbage-details"
          element={<AddGarbageDetailsPage />}
        />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/MyRequestsPage" element={<MyRequestsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
