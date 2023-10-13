const express = require('express');
const router = express.Router();
const userVerifyController = require('../controllers/userVerifyController');

router.get('/', userVerifyController.getAllUserVerify);
router.get('/:id', userVerifyController.getUserVerifyById);
router.post('/', userVerifyController.createUserVerify);
router.put('/:id', userVerifyController.updateUserVerify);
router.delete('/:id', userVerifyController.deleteUserVerify);

module.exports = router;