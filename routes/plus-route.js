const router = require('express').Router();
const  plusController= require('../controllers/plus-controller');
router.post('/search',plusController.plusSearch);
module.exports=router;