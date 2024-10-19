const CollectedWaste = require('../models/CollectedWaste');
const User = require('../models/User');
const { validationResult } = require('express-validator');

class CollectedWasteController {
  async addCollectedWaste(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { truckNumber, wasteCollector, area, paperWaste, foodWaste, polytheneWaste } = req.body;
    const totalWaste = (parseFloat(paperWaste) + parseFloat(foodWaste) + parseFloat(polytheneWaste)).toFixed(2);

    try {
      const user = await User.findOne({ name: wasteCollector });
      if (!user) {
        return res.status(400).json({ message: 'Invalid waste collector. No user found with the given name.' });
      }

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
  }

  async getCollectedWaste(req, res) {
    try {
      const collectedWastes = await CollectedWaste.find();
      res.status(200).json(collectedWastes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data', error });
    }
  }

  async getCollectedWasteById(req, res) {
    try {
      const collectedWaste = await CollectedWaste.findById(req.params.collectedId);
      if (!collectedWaste) return res.status(404).json({ message: 'Record not found' });
      res.status(200).json(collectedWaste);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data', error });
    }
  }

  async updateCollectedWaste(req, res) {
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
  }

  async deleteCollectedWaste(req, res) {
    try {
      const deletedWaste = await CollectedWaste.findByIdAndDelete(req.params.collectedId);
      if (!deletedWaste) return res.status(404).json({ message: 'Record not found' });
      res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting data', error });
    }
  }
}

module.exports = new CollectedWasteController();
