import axios from "axios";

const API_URL = "http://localhost:8070";

export const addPickup = (pickupData) => {
  return axios.post(`${API_URL}/approvedpickup/add`, pickupData);
};

export const getResidentRequests = () => {
  return axios.get(`${API_URL}/schedulePickup/getAllPickups`);
};

export const updateRequestStatus = (requestId, status) => {
  return axios.put(`${API_URL}/schedulePickup/updateStatus/${requestId}`, { status });
};

export const getApprovedPickups = () => {
  return axios.get(`${API_URL}/approvedpickup/getAll`);
};