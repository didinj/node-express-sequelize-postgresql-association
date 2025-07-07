const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

router.post("/", postController.createPost);
router.get("/", postController.getAllPosts);
router.post("/add-tag", postController.addTagToPost);

module.exports = router;
