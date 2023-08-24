const express = require("express");
const router = express.Router();

const {localFileUpload, imageUpload, videoUpload, imageSizeReducer} = require("../controllers/fileUpload");

//api route
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageReducerUpload", imageSizeReducer);
router.post("/localFileUpload", localFileUpload);


module.exports = router;