const express = require('express');
const router = express.Router();
const controller = require("../controllers/userinfo");

// GET /items Router와 Controller를 연결합니다.
router.get("/", controller.get);
router.put("/", controller.put);
router.delete("/", controller.delete);

module.exports = router;
