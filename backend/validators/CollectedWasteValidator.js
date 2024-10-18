const { body } = require('express-validator');

const CollectedWasteValidator = {
  addCollectedWaste: [
    body('truckNumber').optional().isString().withMessage('Truck number must be a string.'),
    body('wasteCollector')
      .isAlpha('en-US', { ignore: ' ' })
      .withMessage('Waste collector name should only contain characters.'),
    body('area').optional().isString().withMessage('Area must be a string.'),
    body('paperWaste')
      .isInt({ gt: 0 }).withMessage('Paper waste must be a whole number greater than zero.'),
    body('foodWaste')
      .isInt({ gt: 0 }).withMessage('Food waste must be a whole number greater than zero.'),
    body('polytheneWaste')
      .isInt({ gt: 0 }).withMessage('Polythene waste must be a whole number greater than zero.')
  ]
};

module.exports = CollectedWasteValidator;
