const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const protect = require("../middleware/auth");
const { retrieveUser } = require("../middleware/user");
const {
  editProfile,
  loadProfile,
  retriveImgUrls,
  getAllSitters,
  retrieveAvatarUrl,
  deleteProfilePhoto,
  loadProfileById
} = require("../controllers/profile");

const fileStorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  }
});

const upload = multer({
  storage: fileStorageEngine,
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".gif" &&
      ext !== ".jpeg" &&
      ext !== ".webp"
    ) {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  }
});

router
  .route("/upload")
  .post(protect, upload.array("images", 5), retrieveImgUrls);

router
  .route("/upload-avatar")
  .post(protect, upload.single("avatar"), retrieveAvatarUrl);

router.route("/photo/:key").delete(protect, deleteProfilePhoto);

router.route("/").put(protect, editProfile);

router.route("/:id").get(loadProfileById);
router.route("/").get(protect, loadProfile);

router.route("/sitters").get(retrieveUser, getAllSitters);

module.exports = router;
