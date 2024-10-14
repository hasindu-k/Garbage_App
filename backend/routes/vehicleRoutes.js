const express = require("express");
const {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  updateAvailable,
  getAllAvailableVehicles
} = require("../controllers/vehicleController");

const router = express.Router();

router.post("/", createVehicle);
router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);
router.put("/:id/availability", updateAvailable);
router.get("/available", getAllAvailableVehicles);

module.exports = router;
