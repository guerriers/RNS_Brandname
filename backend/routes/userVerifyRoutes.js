const express = require("express");
const router = express.Router();
const userVerifyController = require("../controllers/userVerifyController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");


router.get("/check", isAuthenticatedUser,userVerifyController.getUserVerifyByToken);
router.post("/",isAuthenticatedUser, userVerifyController.createUserVerify);
// router.put("/:id", userVerifyController.updateUserVerify);

//User routes
router
  .route('/user-verification/:id')
  .get(
    isAuthenticatedUser,
    authorizeRoles("user"),
    userVerifyController.getUserVerificationStatus
  ) 

//Admin routes
router
  .route("/")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    userVerifyController.getAllUserVerify
  );
router
  .route("/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    userVerifyController.adminUpdateUserVerify
  )
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    userVerifyController.deleteUserVerify
  ).get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    userVerifyController.getUserVerifyById
  );

module.exports = router;
