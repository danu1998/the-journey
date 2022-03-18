const express = require("express");
const { register, login, checkAuth } = require("../controllers/auth");
const {
  addUserBookmark,
  getUserBookmark,
  deleteUserBookmark,
  getAllUserBookmark,
} = require("../controllers/bookmark");
const {
  getJourneys,
  getJourney,
  addJourney,
  deleteJourney,
  updateJourney,
  getUserJourney,
  searchJourney,
} = require("../controllers/journey");
const {
  getProfiles,
  getProfile,
  updateProfile,
} = require("../controllers/profile");
const { updateUser, getUsers, getUser } = require("../controllers/user");
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");
const router = express.Router();

router.get("/journeys", getJourneys);
router.get("/journey/:id", getJourney);
router.post("/journey", auth, uploadFile("image"), addJourney);
router.delete("/journey/:id", auth, deleteJourney);
router.patch("/journey/:id", auth, uploadFile("image"), updateJourney);
router.get("/journeyuser/", auth, getUserJourney);
router.get("/searchjourney", searchJourney);

router.get("/profiles", auth, getProfiles);
router.get("/profile/:id", getProfile);
router.patch("/profile/:id", auth, uploadFile("image"), updateProfile);

router.post("/bookmark/:id", auth, addUserBookmark);
router.get("/bookmark", auth, getUserBookmark);
router.get("/bookmarks", getAllUserBookmark);
router.delete("/bookmark/:id", auth, deleteUserBookmark);

router.patch("/user/", auth, uploadFile("image"), updateUser);
router.get("/users", getUsers);
router.get("/user/", auth, getUser);

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);
module.exports = router;
