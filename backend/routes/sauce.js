const express = require('express');
const router = express.Router();

const auth = require('./../middleware/auth');
const sauceCtrl = require('./../controllers/sauce');
const multer = require('./../middleware/multer-config');

router.post('/', auth, multer, sauceCtrl.postOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.delete('/:id', auth, sauceCtrl.deleteOneSauce);

module.exports = router;
