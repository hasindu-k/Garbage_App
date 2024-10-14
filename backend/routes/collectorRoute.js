const express = require("express");
const router = express.Router();
const {
  getCollectors,
  getResidentRequests,
  allocateRequestsToCollector,
} = require("../controllers/collectorController");

router.get("/collectors", getCollectors); // Fetch collectors
router.get("/resident-requests", getResidentRequests); // Fetch resident requests
router.post("/collectors/:id/allocate", allocateRequestsToCollector); // Allocate requests to collectors

module.exports = router;
