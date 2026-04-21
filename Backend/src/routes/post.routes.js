const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { createPostController, getFeedController } = require('../controller/post.controller');
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
});

/* POST /api/posts [Protected] - Create a new post */
router.post(
    '/', 
    authMiddleware, 
    upload.single("image"), 
    createPostController
);

/* GET /api/posts [Protected/Public] - Get all posts with usernames */
router.get(
    '/', 
    getFeedController
);

module.exports = router;