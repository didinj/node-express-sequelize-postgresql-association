const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);

module.exports = router;
