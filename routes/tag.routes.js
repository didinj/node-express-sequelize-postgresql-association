const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tag.controller");

router.post("/", tagController.createTag);
router.get("/", tagController.getAllTags);

module.exports = router;
