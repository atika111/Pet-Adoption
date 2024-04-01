const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const {
  verifyPassword,
  passwordMatch,
  getUserByToken,
} = require("../middlewares/userMiddleware");
const upload = require("../middlewares/imagesMiddleware");

router.post(
  "/signup",
  upload.single("avatarImage"),
  passwordMatch,
  userControllers.signup
);
router.post("/login", verifyPassword, userControllers.login);
router.get("/users", userControllers.getAllUsers);
router.get("/user/:id", userControllers.getUserById);
router.put("/user/:id", userControllers.updateUser);
router.delete("/user/:id", userControllers.deleteUser);

module.exports = router;
