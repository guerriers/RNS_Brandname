const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  getMyProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
// const uploadImg = multer({ dest: "../img" }).single("p_img");

// router.post("/", uploadImg, uploadReceipt, productController.createProduct);

router.route("/").get(getAllProduct).post(isAuthenticatedUser, authorizeRoles("user"), createProduct);
router
  .route("/myProducts")
  .get(isAuthenticatedUser, authorizeRoles("user"), getMyProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(isAuthenticatedUser, authorizeRoles("user"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("user"), deleteProduct);


module.exports = router;
