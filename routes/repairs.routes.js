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
  restrictTo,
} = require('../middlewares/auth.middleware');

const { validRepairById } = require('../middlewares/repairs.middlewares');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

//proteger las rutas(loguearse antes de hacer cualquier petición)
router.use(protect);

router.get('', restrictTo('employee'), findAllRepairs);

router.get(
  '/:id',
  validRepairById,
  protectAccountOwner,
  restrictTo('employee'),
  findRepairForId
);

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

router.patch(
  '/:id',
  validRepairById,
  protectAccountOwner,
  restrictTo('employee'),
  updateRepair
);

router.delete(
  '/:id',
  validRepairById,
  protectAccountOwner,
  restrictTo('employee'),
  deleteRepair
);

module.exports = { repairsRouter: router };
