const express = require('express');
const router = express.Router();

const controller = require("../controllers/login");

// GET /items Router와 Controller를 연결합니다.
router.post("/", controller.post);
router.get("/", controller.get); //refreshToken
module.exports = router;
