const express = require('express');
const router = express.Router();
const controller = require("../controllers/comments");

// GET /items Router와 Controller를 연결합니다.
router.post("/:recordsId", controller.post);
router.patch("/:commentId", controller.patch);
router.delete("/:commentId", controller.delete);

module.exports = router;
