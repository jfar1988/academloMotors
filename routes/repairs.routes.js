const { Router } = require('express');
const { check } = require('express-validator');

const {
  findAllRepairs,
  findRepairForId,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');

const { validRepairById } = require('../middlewares/repairs.middlewares');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('', findAllRepairs);

//proteger las rutas(loguearse antes de hacer cualquier petición)
router.use(protect);

router.get('/:id', validRepairById, protectAccountOwner, findRepairForId);

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
router.patch('/:id', validRepairById, protectAccountOwner, updateRepair);
router.delete('/:id', validRepairById, protectAccountOwner, deleteRepair);

module.exports = { repairsRouter: router };
