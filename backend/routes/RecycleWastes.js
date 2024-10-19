// routes/RecycleWastes.js
const express = require('express');
const router = express.Router();
const {
  addRecyclingWaste,
  getAllRecyclingWastes,
  getRecyclingWasteById,
  updateRecyclingWaste,
  deleteRecyclingWaste,
} = require('../controllers/recycleWasteController');

// CREATE: Add a new recycling dataset
router.post('/addRecyclingWastes', addRecyclingWaste);

// READ: Get all recycling datasets
router.get('/allRecyclingWastes', getAllRecyclingWastes);

// READ: Get one recycling dataset by recycleID
router.get('/getRecyclingWaste/:recycleID', getRecyclingWasteById);

// UPDATE: Update a recycling dataset by recycleID
router.put('/updateRecyclingWaste/:recycleID', updateRecyclingWaste);

// DELETE: Delete a recycling dataset by recycleID
router.delete('/deleteRecyclingWaste/:recycleID', deleteRecyclingWaste);

module.exports = router;
