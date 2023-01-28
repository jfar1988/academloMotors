const { Router } = require('express');
const {
  findAllRepairs,
  findRepairForId,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');
const router = Router();

router.get('', findAllRepairs);
router.get('/:id', findRepairForId);
router.post('', createRepair);
router.patch('/:id', updateRepair);
router.delete('/:id', deleteRepair);

module.exports = { repairsRouter: router };
