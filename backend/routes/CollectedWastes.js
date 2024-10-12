// routes/CollectedWastes.js
// routes/CollectedWastes.js
const express = require('express');
const router = express.Router();
const CollectedWaste = require('../models/CollectedWaste');

// POST - Store new waste collection data (route: /addCollectedWaste)
router.post('/addCollectedWaste', async (req, res) => {
  const { truckNumber, wasteCollector, area, paperWaste, foodWaste, polytheneWaste } = req.body;
  const totalWaste = (parseFloat(paperWaste) + parseFloat(foodWaste) + parseFloat(polytheneWaste)).toFixed(2);

  try {
    const newWaste = new CollectedWaste({
      truckNumber,
      wasteCollector,
      area,
      paperWaste,
      foodWaste,
      polytheneWaste,
      totalWaste,
    });
    const savedWaste = await newWaste.save();
    res.status(201).json(savedWaste);
  } catch (error) {
    res.status(500).json({ message: 'Error saving waste data', error });
  }
});

// GET - Fetch all waste collection records (route: /getCollectedWaste)
router.get('/getCollectedWaste', async (req, res) => {
  try {
    const collectedWastes = await CollectedWaste.find();
    res.status(200).json(collectedWastes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

module.exports = router;
// GET - Fetch a single waste collection record by ID
router.get('/:collectedId', async (req, res) => {
  try {
    const collectedWaste = await CollectedWaste.findById(req.params.collectedId);
    if (!collectedWaste) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json(collectedWaste);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

// PUT - Update a waste collection record by ID
router.put('/update/:collectedId', async (req, res) => {
  const { truckNumber, wasteCollector, area, paperWaste, foodWaste, polytheneWaste } = req.body;
  const totalWaste = (parseFloat(paperWaste) + parseFloat(foodWaste) + parseFloat(polytheneWaste)).toFixed(2);

  try {
    const updatedWaste = await CollectedWaste.findByIdAndUpdate(
      req.params.collectedId,
      { truckNumber, wasteCollector, area, paperWaste, foodWaste, polytheneWaste, totalWaste },
      { new: true }
    );
    
    if (!updatedWaste) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json(updatedWaste);
  } catch (error) {
    res.status(500).json({ message: 'Error updating data', error });
  }
});

// DELETE - Delete a waste collection record by ID
router.delete('/delete/:collectedId', async (req, res) => {
  try {
    const deletedWaste = await CollectedWaste.findByIdAndDelete(req.params.collectedId);
    
    if (!deletedWaste) return res.status(404).json({ message: 'Record not found' });
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data', error });
  }
});

module.exports = router;
