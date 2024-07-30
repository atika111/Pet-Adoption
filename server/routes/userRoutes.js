const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const {
  verifyPassword,
  passwordMatch,
  getUserByToken,
  verifyToken,
} = require("../middlewares/userMiddleware");
const upload = require("../middlewares/imagesMiddleware");

router.post(
  "/signup",
  upload.single("avatarImage"),
  passwordMatch,
  userControllers.signup
);
router.post("/login", verifyPassword, userControllers.login);
router.get("/logout", userControllers.logout)
router.get("/users", userControllers.getAllUsers);
router.get("/user/:id", userControllers.getUserById);
router.put("/user/:id", upload.single("avatarImage"), userControllers.updateUser);
router.delete("/user/:id", verifyToken, userControllers.deleteUser);
router.get("/current-user", verifyToken, userControllers.getUserByToken);


module.exports = router;

// TODO add admin midllw