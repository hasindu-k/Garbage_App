// In services/collectorService.js
import axios from "axios";

// Fetch users with the role of 'collector'
export const getCollectors = () => axios.get("http://localhost:8070/user/collector");
// http://localhost:8070/user/collector

// Fetch resident requests that need to be allocated
export const getResidentRequests = () => axios.get("/api/resident-requests");

// Allocate selected requests to a collector
export const allocateRequestsToCollector = (collectorId, requestIds) =>
  axios.post(`/api/collectors/${collectorId}/allocate`, { requests: requestIds });
