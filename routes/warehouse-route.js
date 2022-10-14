const router = require('express').Router();
const warehouseController = require('../controllers/warehouse-controller');

router.post('/add', warehouseController.addWarehouse);
router.get('/all', warehouseController.allwarehouse);
router.get('/getWarehouses/:farmerId', warehouseController.getWarehouses);

module.exports = router;