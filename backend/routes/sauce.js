const express = require('express');
const router = express.Router();

const auth = require('./../middleware/auth');
const sauceCtrl = require('./../controllers/sauce');
const multer = require('./../middleware/multer-config');

router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.postOneSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router;
