const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// const uploadImg = multer({ dest: "../img" }).single("p_img");

// router.post("/", uploadImg, uploadReceipt, productController.createProduct);

router.get('/', productController.getAllProduct);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
