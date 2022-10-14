const router = require('express').Router();
const productController = require('../controllers/product-controller');

router.get('/getProducts/:farmerId', productController.getProducts);
router.post('/addProducts/:farmerId', productController.addProduct);

module.exports = router;