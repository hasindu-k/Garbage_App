// routes/RecycleWastes.js
const express = require('express');
const router = express.Router();
const RecycleWaste = require('../models/RecycleWaste');

// CREATE: Add a new recycling dataset
router.post('/addRecyclingWastes', async (req, res) => {
  const {
    truckNumber,
    area,
    paperWeight,
    foodWeight,
    polytheneWeight,
    totalWaste,
    calculatedCharge,
  } = req.body;

  try {
    const newWaste = new RecycleWaste({
      truckNumber,
      area,
      paperWeight,
      foodWeight,
      polytheneWeight,
      totalWaste,
      calculatedCharge,
    });

    await newWaste.save();
    res.status(201).json({ message: 'Recycling waste data added successfully', newWaste });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add recycling waste data', error });
  }
});

// READ: Get all recycling datasets
router.get('/allRecyclingWastes', async (req, res) => {
  try {
    const wastes = await RecycleWaste.find();
    res.status(200).json(wastes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recycling data', error });
  }
});

// READ: Get one recycling dataset by recycleID
router.get('/getRecyclingWaste/:recycleID', async (req, res) => {
  const { recycleID } = req.params;

  try {
    const waste = await RecycleWaste.findById(recycleID);
    if (!waste) {
      return res.status(404).json({ message: 'Recycling waste data not found' });
    }
    res.status(200).json(waste);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recycling waste data', error });
  }
});

// UPDATE: Update a recycling dataset by recycleID
router.put('/updateRecyclingWaste/:recycleID', async (req, res) => {
  const { recycleID } = req.params;
  const {
    truckNumber,
    area,
    paperWeight,
    foodWeight,
    polytheneWeight,
    totalWaste,
    calculatedCharge,
  } = req.body;

  try {
    const updatedWaste = await RecycleWaste.findByIdAndUpdate(
      recycleID,
      {
        truckNumber,
        area,
        paperWeight,
        foodWeight,
        polytheneWeight,
        totalWaste,
        calculatedCharge,
      },
      { new: true } // Returns the updated document
    );

    if (!updatedWaste) {
      return res.status(404).json({ message: 'Recycling waste data not found' });
    }

    res.status(200).json({ message: 'Recycling waste data updated successfully', updatedWaste });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update recycling waste data', error });
  }
});

// DELETE: Delete a recycling dataset by recycleID
router.delete('/deleteRecyclingWaste/:recycleID', async (req, res) => {
  const { recycleID } = req.params;

  try {
    const deletedWaste = await RecycleWaste.findByIdAndDelete(recycleID);

    if (!deletedWaste) {
      return res.status(404).json({ message: 'Recycling waste data not found' });
    }

    res.status(200).json({ message: 'Recycling waste data deleted successfully', deletedWaste });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete recycling waste data', error });
  }
});

module.exports = router;
