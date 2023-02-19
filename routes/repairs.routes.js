const { Router } = require('express');
const { check } = require('express-validator');

const {
  findAllRepairs,
  findRepairForId,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');
const { protect } = require('../middlewares/auth.middleware');

const { validRepairById } = require('../middlewares/repairs.middlewares');
const { validateFields } = require('../middlewares/validateField.middleware');

check;

const router = Router();

router.get('', findAllRepairs);
router.get('/:id', findRepairForId);
router.post(
  '',
  [
    check('date', 'the date is mandatory (year/month/day)')
      .not()
      .isEmpty()
      .isDate(),
    check('motorsNumber', 'motorsNumber is mandatory').not().isEmpty(),
    check('description', 'description is mandatory').not().isEmpty(),
    protect,
    validateFields,
  ],
  createRepair
);
router.patch('/:id', validRepairById, updateRepair);
router.delete('/:id', validRepairById, deleteRepair);

module.exports = { repairsRouter: router };
