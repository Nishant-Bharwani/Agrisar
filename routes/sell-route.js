const router = require('express').Router();
const sellController = require('../controllers/sell-controller');

router.post('/addToCart', sellController.addToCart);
router.get('/viewCart/:buyerId', sellController.viewCart);

module.exports = router;