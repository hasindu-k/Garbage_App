const express = require('express');
const router = express.Router();
const CollectedWasteController = require('../controllers/CollectedWasteController');
const CollectedWasteValidator = require('../validators/CollectedWasteValidator');

// POST - Store new waste collection data (route: /addCollectedWaste)
router.post('/addCollectedWaste', CollectedWasteValidator.addCollectedWaste, CollectedWasteController.addCollectedWaste);

// GET - Fetch all waste collection records (route: /getCollectedWaste)
router.get('/getCollectedWaste', CollectedWasteController.getCollectedWaste);

// GET - Fetch a single waste collection record by ID
router.get('/:collectedId', CollectedWasteController.getCollectedWasteById);

// PUT - Update a waste collection record by ID
router.put('/update/:collectedId', CollectedWasteController.updateCollectedWaste);

// DELETE - Delete a waste collection record by ID
router.delete('/delete/:collectedId', CollectedWasteController.deleteCollectedWaste);

module.exports = router;
