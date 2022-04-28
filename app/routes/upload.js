const express = require("express");
const router = express.Router();
const controller = require("../controllers/uploadController");

router.post('/uploadProfilePicture', controller.uploadFiles);

module.exports = router;
