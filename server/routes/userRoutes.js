const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  logoutUser,
} = require("../controllers/authController");
const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getAllProfiles,
  getCurrentUserId,
} = require("../controllers/userController");
// const protect = require("../Middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/allUsers", getAllProfiles);
router.get("/profile/:id", getUserProfile);
router.put("/profile/:id", updateUserProfile)
router.get('/api/user/current', getCurrentUserId);
router.delete("/profile/:id", deleteUserProfile);

module.exports = router;
