const router = require('express').Router();
const productController = require('../controllers/product-controller');

router.get('/getAllProducts', productController.getAll);
router.get('/getProducts/:farmerId', productController.getProducts);
router.post('/addProducts/:farmerId', productController.addProduct);
router.get('/getStoredProducts/:warehouseId/:farmerId', productController.getStored);
router.post('/storeProduct', productController.store);

module.exports = router;